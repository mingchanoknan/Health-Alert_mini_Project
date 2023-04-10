import React, { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
import { View } from "react-native";
import * as Permissions from 'expo-permissions';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NotificationAlarm = ({navigation}) => {

  async function requestNotificationPermission() {
    const { status } = await Notifications.requestPermissionsAsync(Permissions.NOTIFICATIONS)
    if (status != 'granted') {
      alert('You need to grant permission to receive notifications');
    }
    else {
      scheduleAlarm()
    }
  }
  function addSeconds(date, seconds) {
    date.setSeconds(date.getSeconds() + seconds);
    return date;
  }
  const schedulingOptions = {
    date: new Date().setHours(0, 49, 0)

    // seconds: 2
  };

  const handleNotificationClick = (notification) => {
    // ดึง screen ที่กำหนดใน notification
    // const screen = notification.request.content.data.screen;
    // console.log("screen "+ screen)
    // // เปิดหน้าที่ต้องการตาม screen ที่กำหนด
    navigation.navigate("test");
  }
  
  useEffect(() => {
    requestNotificationPermission()
    }, [])
    async function scheduleAlarm() {
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Alarm',
            body: 'Wake up!',
            sound: 'sound.wav',
          },
          trigger: schedulingOptions,

        
        });
      // console.log("alarm")
        // Notifications.addNotificationResponseReceivedListener(handleNotificationClick);
  }
  Notifications.addNotificationResponseReceivedListener(handleNotificationClick);
    return (
        <View/>
    )
}

export default NotificationAlarm;