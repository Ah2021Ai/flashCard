import React, { useEffect } from 'react';
import { FlatList } from "react-native"
import Deck from './Deck';
import {getDecks} from '../utils/api';


const Decks = () => {
    const [decks, setDecks] = React.useState([])
    useEffect(() => {
        let cancel = false;
        getDecks().then((res) => {
            if (cancel) return;
            setDecks(res);
        })
        return () => {
            cancel = true
        }
    }, [decks])
    const renderItem = ({ item }) => (
        <Deck
            item={item}
        />
    )
    return (
        <FlatList
            data={decks}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
        />
    )
}

export default Decks