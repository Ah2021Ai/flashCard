import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Decks from './components/Decks';
import NewDecks from './components/NewDecks';
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import DeckDetails from './components/DeckDetails';

// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const DecksStack = createNativeStackNavigator()

const DecksStackScreen = () => (
    <DecksStack.Navigator >
        <DecksStack.Screen name="Decks" component={Decks} />
        <DecksStack.Screen name="Deck Details" component={DeckDetails} />
    </DecksStack.Navigator>
)


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false}}>
        <Tab.Screen
          name="DecksS"
          component={DecksStackScreen}
          options={{
            tabBarIcon: (({color, size}) => (
              <MaterialIcons name='deck' color={color} size={size} />
            ))
          
          }}
        />
        <Tab.Screen
          name="New Deck"
          component={NewDecks}
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
