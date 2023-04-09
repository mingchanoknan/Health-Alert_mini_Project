import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";
import { baseUrl } from "@env";
import axios from "axios";

const CheckInfo = ({navigation}) => {
  // const onConfirmInfo = async (event) => {
  //   // navigation.dispatch(StackActions.replace("Home"));
  //   // navigation.dispatch(StackActions.replace("Home"));
  //   navigation.navigate("Home");
  // };
  const [idcard, setIdcard] = useState("1711000121111");
  const [name, setName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");


  const onChangeIDcardHandler = (id) => {
    setIdcard(id);
  };

  const onChangeNameHandler = (name) => {
    setName(name);
  };

  const onChangeBirthDateHandler = (date) => {
    setBirthDate(date);
  };

  const onChangeAddressHandler = (address) => {
    setAddress(address);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize:28, fontWeight: 'bold', color: '#373736', marginBottom: 30 }}>ข้อมูลตามบัตรประชาชน</Text>
      
      <Text style={styles.txt}>เลขบัตรประชาชน</Text>
      <TextInput onChangeText={onChangeIDcardHandler} style={styles.textInput}> {idcard} </TextInput>

      <Text style={styles.txt}>ชื่อ-นามสกุล</Text>
      <TextInput onChangeText={onChangeNameHandler} style={styles.textInput}>{name}</TextInput>
      
      <Text style={styles.txt}>วัน-เดือน-ปีเกิด</Text>
      <TextInput onChangeText={onChangeBirthDateHandler} style={styles.textInput}> {birthdate}</TextInput>

      <Text style={styles.txt}>ที่อยู่</Text>
      <TextInput onChangeText={onChangeAddressHandler} style={[styles.textInput, {height: "20%", borderRadius: 20}]}> {address} </TextInput>
    
      <TouchableOpacity
              style={styles.btnCheck}
              onPress={() =>{ navigation.dispatch(StackActions.replace("Home")); }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: '#373736',
                  textAlign: "center",
                }}
              >
                {" "}
                เข้าสู่ระบบ{" "}
              </Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 2,
    padding:15,
    justifyContent: 'center',
  },
  textInput: {
    // backgroundColor: "#F5F7F8",
    borderColor: "#A0A0A0",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 3,
    height: '4%'
  },
  txt: {
    fontSize: 14, fontWeight: "bold", marginTop: 20, color: '#373736'
  },
  btnCheck: {
    backgroundColor: "#A3E5E7",
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center"
  }
});
export default CheckInfo;
