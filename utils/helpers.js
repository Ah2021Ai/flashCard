import { AsyncStorage } from "react-native"
import { getData } from "./_data"

import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = "Udacity:flashCard"

export const setAsyncLocalStorage = async () => {
    try {
        const decks = getData() 
        AsyncStorage.setItem("decks", JSON.stringify(decks))
        alert("Data successfully saved")
    } catch (e) {
        alert("saving data failed")
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Notifications.requestPermissionsAsync()
                .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        Notifications.setNotificationHandler({
                            handleNotification: async () => ({
                                shouldShowAlert: true,
                                shouldPlaySound: true,
                                shouldSetBadge: false
                            })
                        })
                        //create a date object to trigger the notification (android)
                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(12)
                        tomorrow.setMinutes(0)
                        tomorrow.setSeconds(0)

                        //set and schedule notification for a days time at 12pm
                        Notifications.scheduleNotificationAsync({
                            content: {
                                title: 'Complete your quizzes!',
                                body: "👋 don't forget to complete at least one quiz today!",
                            },
                            trigger: tomorrow
                        })

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}