import { AsyncStorage } from "react-native"
import Decks from "../components/Decks"
import { DECKS_STORAGE_KEY } from "./_data"

export const getDecks = async () => {
    try {
        const decks = await AsyncStorage.getItem('decks')
        return Object.values(JSON.parse(decks))
    } catch (e) {
        alert(e)
    } 
}

export const getDeck = async (deckTitle) => {
    try {
        const data = await AsyncStorage.getItem('decks')
        const decks = JSON.parse(data)
        const deck = decks[deckTitle]
        return deck
    } catch (e) {
        alert("err", e)
    }
}

export const saveDeckTitle = (deckTitle) => {
    try {
        const deck = {
            [deckTitle]: {
                title: deckTitle,
                questions: []
            }
        }
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))   
    } catch (error) {
        console.log("error here in api saveDeckTitle", error)
    }
}   

export const addCardToDeck =  async ({title, card}) => {
    const res = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    const decks = JSON.parse(res)
    const prevQuestions = decks[title].questions
    const questions =  [...prevQuestions, card]
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            questions: [...questions]
        }
    }))
}

{/*
Tip
To manage your AsyncStorage database, you'll want to create four different helper methods.

getDecks: return all of the decks along with their titles, questions, and answers.
getDeck: take in a single id argument and return the deck associated with that id.
saveDeckTitle: take in a single title argument and add it to the decks.
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
*/}