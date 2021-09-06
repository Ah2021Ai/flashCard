import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default Deck = ({item}) => {
    console.log("hi fro mdeck")
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Deck Details')}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
)}