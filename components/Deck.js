import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default Deck = ({item}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {navigation.navigate('Deck Details', {deckTitle: item.title})}}>
            <Text>{item.title}</Text>
            <Text>{item.questions.length} cards</Text>
        </TouchableOpacity>
)}