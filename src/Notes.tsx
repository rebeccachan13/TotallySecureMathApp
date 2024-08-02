import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Note from './components/Note';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
import { SHA } from 'react-native-simple-crypto';

export interface INote {
    title: string;
    text: string;
}

interface IProps {}

interface IState {
    notes: INote[];
    newNoteTitle: string;
    newNoteEquation: string;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Notes'> & IProps;

export default class Notes extends React.Component<TProps, IState> {
    constructor(props: Readonly<TProps>) {
        super(props);

        this.state = {
            notes: [],
            newNoteTitle: '',
            newNoteEquation: ''
        };

        this.onNoteTitleChange = this.onNoteTitleChange.bind(this);
        this.onNoteEquationChange = this.onNoteEquationChange.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    public async componentDidMount() {
        const existing = await this.getStoredNotes();
        this.setState({ notes: existing });
    }

    public async componentWillUnmount() {
        this.storeNotes(this.state.notes);
    }

    private async getStoredNotes(): Promise<INote[]> {
        const suffix = await SHA.sha256(this.props.route.params.user.username + this.props.route.params.user.hashedPassword);

        const value = await EncryptedStorage.getItem('notes-' + suffix);

        if (value !== null) {
            return JSON.parse(value);
        } else {
            return [];
        }
    }

    private async storeNotes(notes: INote[]) {
        const suffix = await SHA.sha256(this.props.route.params.user.username + this.props.route.params.user.hashedPassword);

        const jsonValue = JSON.stringify(notes);
        await EncryptedStorage.setItem('notes-' + suffix, jsonValue);
    }

    private onNoteTitleChange(text: string) {
        this.setState({ newNoteTitle: text });
    }

    private onNoteEquationChange(text: string) {
        this.setState({ newNoteEquation: text });
    }

    private addNote() {
        const { newNoteTitle, newNoteEquation } = this.state;
        if (newNoteTitle && newNoteEquation) {
            const newNote: INote = { title: newNoteTitle, text: newNoteEquation };
            this.setState((prevState) => ({
                notes: [...prevState.notes, newNote],
                newNoteTitle: '',
                newNoteEquation: ''
            }), () => {
                this.storeNotes(this.state.notes);
            });
        } else {
            Alert.alert('Error', 'Both title and equation are required.');
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {this.state.notes.map((note, index) => (
                        <Note key={index} title={note.title} text={note.text} />
                    ))}
                </ScrollView>
                <TextInput
                    style={styles.input}
                    value={this.state.newNoteTitle}
                    onChangeText={this.onNoteTitleChange}
                    placeholder="Title"
                />
                <TextInput
                    style={styles.input}
                    value={this.state.newNoteEquation}
                    onChangeText={this.onNoteEquationChange}
                    placeholder="Equation"
                />
                <Button title="Add Note" onPress={this.addNote} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    }
});
