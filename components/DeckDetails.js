import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getDeck } from '../utils/api'

export default DeckDetails = ({navigation, route}) => {
    const [value, setValue] = useState(route.params.deckTitle)
    const [deck, setDeck] = useState(null)
    const readData = async (cancel) => {
        try {
            const deck = await getDeck(value)
            if (deck !== null) {
                if (cancel) return;
                setDeck(deck)
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        let cancel = false;
        readData(cancel)
        return () => {
            cancel = true
        }

    }, [deck])
    useEffect(() => {
        navigation.setOptions({
            title: value === '' ? 'No title' : value,
        })
    }, [navigation, value])

    return (
        <View>
            <Text>{value}</Text>
            <Text>{deck?.questions.length} cards</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Add Card', {deckTitle: value})}>
                <Text>
                    Add Card    
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Quiz', {deckTitle: value, index: 0, totalCorrect: 0})}> 
                <Text>
                    Start Quiz
                </Text>
            </TouchableOpacity>
        </View>
    )
}