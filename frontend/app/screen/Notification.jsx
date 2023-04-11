import React, { useEffect } from "react";
import * as Notifications from 'expo-notifications';
import { View } from "react-native";
import * as Permissions from 'expo-permissions';
import axios from "axios";
import { baseUrl } from "@env";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NotificationAlarm = ({navigation}) => {

  const requestNotificationPermission = async (hhmmss) => {
    const { status } = await Notifications.requestPermissionsAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      try {
        await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alarm',
          body: 'Wake up!',
        },
          trigger:null
        //   {
        //   date: new Date().setHours(parseInt(hhmmss[0]), parseInt(hhmmss[1]), parseInt(hhmmss[2]))
        // },
        });
      }
      catch (err) {
        console.log(err)
      }
      
      Notifications.addNotificationResponseReceivedListener(handleNotificationClick);
    } else {
      alert('You need to grant permission to receive notifications');
    }
  };

  const handleNotificationClick = (notification) => {
    navigation.navigate("alarm");
  };
  
  useEffect(() => {
    const getTimeForAlert = async () => {
      const id = 3;
      let promises =""
      const response = await axios.get(`${baseUrl}/getEdableTimebyId/${id}`);
      if (response.data.length){
        const hhmmssValues = response.data.map(x => x.split(":"));
        promises = hhmmssValues.map(hhmmss => requestNotificationPermission(hhmmss));
      }
      requestNotificationPermission("14:49:0")
      if (promises != "") {
        await Promise.all(promises);
      }
      
    };
    getTimeForAlert();
    
  }, []);
  
  return (
    <View/>
  );
};

export default NotificationAlarm;
