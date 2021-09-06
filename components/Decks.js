import React from 'react';
import { FlatList, SafeAreaView } from "react-native"
import Deck from './Deck';
import decks from '../utils/_data';


const Decks = () => {
    const renderItem = ({ item }) => (
        <Deck
            item={item}
        />
    )
    return (
        <FlatList
            data={Object.values(decks)}
            renderItem={renderItem}
            keyItem={(item) => item.title}
        />
    )
}

export default Decks