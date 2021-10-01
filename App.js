import React, { useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import DeckDetails from './components/DeckDetails';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { setAsyncLocalStorage, setLocalNotification } from './utils/helpers';

const DecksStack = createNativeStackNavigator()

const DecksStackScreen = ({route}) => {
  return (
    <DecksStack.Navigator >
        <DecksStack.Screen name="Decks" component={Decks} />
        <DecksStack.Screen name="Deck Details" component={DeckDetails} />
        <DecksStack.Screen name="Add Card" component={NewCard} />
        <DecksStack.Screen name="Quiz" component={Quiz} />
    </DecksStack.Navigator>
)}

const NewDeckStack = createNativeStackNavigator()

const NewDeckStackScreen = ({route}) => {
  return (
    <NewDeckStack.Navigator>
      <NewDeckStack.Screen name="New Deck" component={NewDeck} />
    </NewDeckStack.Navigator>
  )}

const Tab = createBottomTabNavigator()

export default function App() {
  useEffect(() => {
    setAsyncLocalStorage()
    setLocalNotification()
  })
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={DecksStackScreen}
          options={{
            tabBarIcon: (({color, size}) => (
              <MaterialIcons name={'deck'} color={color} size={size} />
            ))
          
          }}
        />
        <Tab.Screen
          name="Add Deck"
          component={NewDeckStackScreen}
          options={{
            tabBarIcon: (({color, size}) => (
              <Entypo name='add-to-list' color={color} size={size} />
            ))
          
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
