import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
import SimpleCrypto from 'react-native-simple-crypto'; // Importing react-native-simple-crypto
import { randomBytes } from 'react-native-randombytes'; // Importing react-native-randombytes for generating random bytes


export interface IUser {
	username: string;
	//password: string;
	hashedPassword: string; // Storing hashed password
	salt: string; // Adding salt for password hashing
}

interface IProps {
	onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;

// Function to hash passwords with a salt
const hashPassword = async (password: string) => {
    const saltBuffer = randomBytes(16);
    const salt = saltBuffer.toString('hex'); // Convert buffer to hex string
    const hashedPassword = await SimpleCrypto.SHA.sha256(password + salt);
    return { salt, hashedPassword };
}

// Function to verify passwords by comparing the hash
const verifyPassword = async (password: string, salt: string, hashedPassword: string) => {
    const hashToVerify = await SimpleCrypto.SHA.sha256(password + salt);
    return hashToVerify === hashedPassword;
}

export default function Login(props: TProps) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [users, setUsers] = useState<IUser[]>([]);

	// const users: IUser[] = [
	// 	{ username: 'joe', password: 'secret' },
	// 	{ username: 'bob', password: 'password' },
	// ];

	// Initialize users with hashed passwords and salts
    useEffect(() => {
        const initializeUsers = async () => {
            const joe = await hashPassword('secret');
            const bob = await hashPassword('password');
            setUsers([
                { username: 'joe', hashedPassword: joe.hashedPassword, salt: joe.salt },
                { username: 'bob', hashedPassword: bob.hashedPassword, salt: bob.salt }
            ]);
        };

        initializeUsers();
    }, []);

	// Function to handle login logic
	//function login = async () => {
		//let foundUser: IUser | false = false;

		//for (const user of users) {
			// if (username === user.username && password === user.password) {
			// 	foundUser = user;

			// 	break;
	const login = async () => {
		let foundUser: IUser | false = false;
		
		for (const user of users) {
			// Compare entered password with hashed password
            if (username === user.username && await verifyPassword(password, user.salt, user.hashedPassword)) {
                foundUser = user;
                break;
			}
		}

		if (foundUser) {
			props.onLogin(foundUser);
		} else {
			Alert.alert('Error', 'Username or password is invalid.');
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.username}
				value={username}
				onChangeText={setUsername}
				placeholder="Username"
			/>
			<TextInput
				style={styles.password}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				secureTextEntry // Add secureTextEntry for password input
			/>
			<Button title="Login" onPress={login} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	username: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	password: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	}
});