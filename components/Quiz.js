import React, { useState, useEffect}  from "react"
import { View, Text, TouchableOpacity} from "react-native"
import { getDeck } from "../utils/api"
import { clearLocalNotification, setLocalNotification } from "../utils/helpers"

const Quiz = ({navigation, route}) => {
    const deckTitle = route.params.deckTitle
    const totalCorrect = route.params.totalCorrect
    let index = route.params.index 
    const [show, setShow] = useState(true)
    const [question, setQuestion] = useState({})
    const [deck, setDeck] = useState(null)
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(0)
    const [hideNavHeader, setHideNavHeader] = useState(false)

    const readData = async () => {
        try {
            const deck = await getDeck(deckTitle)
            if (deck !== null) {
                setDeck(deck)
                setQuestion(deck.questions[index])
                setCurrent(index < deck.questions.length ? index + 1 : total)
                setTotal(deck.questions.length)
                if (!deck.questions[index + 1]) {
                    setHideNavHeader(true)
                }
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        readData()
    }, [])

    useEffect(() => {
        if (hideNavHeader) {
            navigation.setOptions({
                headerShown: false
            })
        }
        clearLocalNotification()
        .then(setLocalNotification())
        }, [navigation])
    
    return (
        <View>
            {current !== 0 &&
                <Text>
                    {`${current} / ${total} `}
                </Text>
            }      
            {question ?
                <View>
                    {show ?
                        <Text>{question.question}</Text>
                        :
                        <Text>{question.answer}</Text>}
                    {show ? 
                        <TouchableOpacity
                            onPress={() => setShow(!show)}
                        >
                            <Text>
                                Answer
                            </Text>
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity
                            onPress={() => setShow(!show)}
                        >
                            <Text>
                                question
                            </Text>
                        </TouchableOpacity>}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push(
                                'Quiz',
                                {
                                    deckTitle: deckTitle,
                                    index: index + 1,
                                    totalCorrect: totalCorrect + 1
                                }
                            )}}
                    >
                        <Text>
                            Correct
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => 
                            navigation.push(
                                'Quiz',
                                {
                                    deckTitle: deckTitle,
                                    index: index + 1,
                                    totalCorrect
                                }
                            )}
                    >
                        <Text>
                            Incorrect
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Text>Total Correct {(totalCorrect / total) * 100}%</Text>
                    <TouchableOpacity
                        onPress={() => 
                            navigation.push(
                                'Quiz',
                                {
                                    deckTitle: deckTitle,
                                    index: 0,
                                    totalCorrect: 0
                                }
                            )}
                    >
                        <Text>
                            Restart Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('Deck Details', {deckTitle})}}
                    >
                        <Text>
                            Back to {deckTitle}
                        </Text>
                    </TouchableOpacity>
                </View>}
            
        </View>
)}
export default Quiz