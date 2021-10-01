import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { TextInput, TouchableOpacity, View, Text, AsyncStorage } from "react-native"
import { addCardToDeck } from "../utils/api"
import { DECKS_STORAGE_KEY } from "../utils/_data"

const NewCard = ({route}) => {
    const navigation = useNavigation()
    const [question, onChangeQuestion] = useState("")
    const [answer, onChangeAnswer] = useState("")
    const title =  route.params.deckTitle

    const handleSubmitQuestion = () => {
        if (question === "" || answer === "") return
        const card = {
            question,
            answer
        }
        addCardToDeck({title, card})
        navigation.navigate('Deck Details', {deckTitle: title})
    }

    return (
        <View>
            <TextInput
                placeholder="Enter your Question"
                onChangeText={onChangeQuestion}
                value={question}
            /> 
            <TextInput
                placeholder="Enter your Answer"
                onChangeText={onChangeAnswer}
                value={answer}
            /> 
            <TouchableOpacity onPress={handleSubmitQuestion}>
                <Text>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    )
    
}
export default NewCard;