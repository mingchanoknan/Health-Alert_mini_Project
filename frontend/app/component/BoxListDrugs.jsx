import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";

const BoxListDrugs = (item) => {
  const [img, seItmg] = useState(item.item.medicine_image);
  // const [morning_time, setMorning_Time] = useState(item.item.morning_time);
  // const [noon_time, setNoon_Time] = useState(item.item.noon_time);
  // const [evening_time, setEvening_Time] = useState(item.item.evening_time);
  // const [night_time, setNight_Time] = useState(item.item.night_time);
  const [medicine, setMedicine] = useState(item.item.medicine_name);
  const [amount, setAmount] = useState(item.item.amount_per_time);
  const [period, setPeriod] = useState(item.item.period);
  const [time, setTime] = useState(item.item.time);
  const [now, setNow] = useState(false);
  const [show, setShow] = useState(false);
  const [timePeriod, setTimePeriod] = useState("");
  let date = new Date();
  let timeNow = date.toTimeString();
  // console.log("now" + timeNow.slice(0, 5));
  // console.log("time_morning" + morning_time);
  // console.log("time_nooning" + noon_time);
 
  //เช้า 4-10
  //กลางวัน 11-15
  //เย็น 16-20
  //ก่อน 21:00-04
  // console.log('check----')
  // useEffect(() => {
  //   if (Number.parseInt(timeNow.slice(0, 2)) >= 4 && Number.parseInt(timeNow.slice(0, 2)) <= 10){
  //     setTimePeriod('morning');
  //   } else if (Number.parseInt(timeNow.slice(0, 2)) >= 11 && Number.parseInt(timeNow.slice(0, 2)) <= 16){
  //     setTimePeriod('noon');
  //   } else if (Number.parseInt(timeNow.slice(0, 2)) >= 16 && Number.parseInt(timeNow.slice(0, 2)) <= 20){
  //     setTimePeriod('evening');
  //   } else if ((Number.parseInt(timeNow.slice(0, 2)) >= 21 && Number.parseInt(timeNow.slice(0, 2)) <= 23) ||(Number.parseInt(timeNow.slice(0,2)) >= 0 && Number.parseInt(timeNow.slice(0,2)) <= 3)){
  //     setTimePeriod('night');
  //   }  else {
  //     setTimePeriod('morning');
  //   }
  // }, []);

  
  // useEffect(() => {
  //   console.log(timePeriod +' time');
  //   if(timePeriod == "morning"){
  //     setNow(true);
  //     setTime(morning_time);
  //   }else if(timePeriod == "noon"){
  //     setNow(true);
  //     setTime(noon_time);
  //   }else if(timePeriod == "evening"){
  //     setNow(true);
  //     setTime(evening_time);
  //   }else{
  //     setNow(true);
  //     setTime(night_time);
  //   }
  // }, [timePeriod]);

  return (
    <>
      {time != null && (
        <Card style={styles.card}>
          <Card.Content style={{ flexDirection: "row" }}>
            <Card.Cover
              style={{ width: 90, height: 90 }}
              source={{
                uri: img,
              }}
            />
            <Card.Content style={{ flexDirection: "column", width: "80%" }}>
              <Text variant="titleMedium">{medicine}</Text>
              <Text variant="bodySmall">รับประทานครั้งละ {amount} เม็ด</Text>
              <Text variant="bodySmall">{period}</Text>
              <Text
                style={{
                  color: "red",
                  width: 70,
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 10,
                  borderWidth: 2,
                  left: "60%",
                  borderColor: "gray",
                }}
                variant="titleMedium"
              >
                {time.slice(0,5)}
              </Text>
            </Card.Content>
          </Card.Content>
        </Card>
       )} 
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    alignSelf: "center",
    width: "80%",
    padding: 5,
    backgroundColor: "#CBECFF",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  shadow: {
    position: "absolute",
    zIndex: 10,
  },
  txt: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#777777",
    marginBottom: 10,
  },
  textLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default BoxListDrugs;
