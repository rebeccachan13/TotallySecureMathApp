import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { evaluate } from 'mathjs';

interface IProps {
	title: string;
	text: string;
}

function Note(props: IProps) {
	// Evaluate the equation in a safer way without using eval
	function evaluateEquation() {
		//const result = eval(props.text); // Insecure way to evaluate the equation

		// Evaluate the equation in a safer way without using eval
		const safeEquationRegex = /^[0-9+\-*/().\s]+$/;		
		if (!safeEquationRegex.test(props.text)) {
            Alert.alert('Error', 'Invalid equation. Please use only numbers and basic math operators.');
            return;
        }

		try {
            const result = evaluate(props.text);
            Alert.alert('Result', 'Result: ' + result);
        } catch (error) {
            Alert.alert('Error', 'Unable to evaluate the equation. Please check your input.');
        }
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{props.title}
			</Text>
			<Text style={styles.text}>
				{props.text}
			</Text>

			<View style={styles.evaluateContainer}>
				<Button title='Evaluate' onPress={evaluateEquation} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#fff',
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 16,
	},
	evaluateContainer: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default Note;