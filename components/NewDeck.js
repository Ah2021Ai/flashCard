import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, TextInput, View, Text } from "react-native"

const NewDecks = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text>What is the title of your new deck?</Text>
            <TextInput placeholder="Deck Title" />
            <TouchableOpacity onPress={() => navigation.navigate('Decks')}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewDecks
