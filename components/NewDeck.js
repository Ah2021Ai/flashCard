import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { TouchableOpacity, TextInput, View, Text } from "react-native"
import { saveDeckTitle } from '../utils/api';

const NewDecks = () => {
    const navigation = useNavigation()
    const [deck, onChangeDeck] = useState("")

    const handleSubmitDeck = () => {
        if (deck === "") return
        saveDeckTitle(deck)
        navigation.navigate('Decks')
    }

    return (
        <View>
            <Text>What is the title of your new deck?</Text>
            <TextInput
                placeholder="Deck Title"
                onChangeText={onChangeDeck}
                value={deck}
            />
            <TouchableOpacity onPress={handleSubmitDeck}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewDecks
