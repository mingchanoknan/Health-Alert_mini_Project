import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { baseUrl } from "@env";
import axios from "axios";
import { PATIENT } from "../dummy/Patient";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckInfo = ({ route, navigation }) => {
  const { data } = route.params;
  const [idcard, setIdcard] = useState("1711000121111");
  const [name, setName] = useState("นางสาวอาภัสรา โมรัษเฐียร");
  const [id, setId] = useState(1);
  const [birthdate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");

  const storeData = async (value) => {
    try {
      
      const jsonValue = JSON.stringify(value)
      // console.log(jsonValue)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log("error")
      console.log(e)
    }
  }

  useEffect(() => {
   
    setIdcard(data.Identification_Number);
    setName(data.FullNameTH);
    setBirthDate(data.BirthdayTH);
    setAddress(data.Address);
  }, []);
  const onConfirmInfo = async (event) => {
    try {
      const result = await axios.get(`${baseUrl}/getPatient/${idcard}`);
      if (result.data != []) {
        // console.log(result.data)
        await storeData(result.data)
        navigation.dispatch(
          StackActions.replace("Home")
        );
      } else {
        Alert.alert(
          //title
          ' ไม่พบบัญชีผู้ใช้งาน',
          //body
          'คุณต้องการถ่ายรูปบัตรประชาชนใหม่หรือไม่?',
          [
            {
              text: 'Yes', onPress: () => navigation.navigate("Scan"),
          style:'default'  },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            }
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      }
    } catch (error) {
      console.log(error);
    }
    // navigation.dispatch(StackActions.replace("Home", { name: name, id: id }));
  };

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
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#373736",
          marginBottom: 30,
        }}
      >
        ข้อมูลตามบัตรประชาชน
      </Text>

      <Text style={styles.txt}>เลขบัตรประชาชน</Text>
      <TextInput value={idcard} onChangeText={onChangeIDcardHandler} style={styles.textInput}>
        
      </TextInput>

      <Text style={styles.txt}>ชื่อ-นามสกุล</Text>
      <TextInput value={name} onChangeText={onChangeNameHandler} style={styles.textInput}>
        
      </TextInput>

      <Text style={styles.txt}>วัน-เดือน-ปีเกิด</Text>
      <TextInput value={birthdate}
        onChangeText={onChangeBirthDateHandler}
        style={styles.textInput}
      >
      </TextInput>

      <Text style={styles.txt}>ที่อยู่</Text>
      <TextInput value={address}
        onChangeText={onChangeAddressHandler}
        style={[styles.textInput, { height: "20%", borderRadius: 20 }]}
      >
      </TextInput>

      <TouchableOpacity style={styles.btnCheck} onPress={onConfirmInfo}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#373736",
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
    padding: 15,
    justifyContent: "center",
  },
  textInput: {
    borderColor: "#A0A0A0",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 3,
    height: "4%",
  },
  txt: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    color: "#373736",
  },
  btnCheck: {
    backgroundColor: "#A3E5E7",
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
  },
});
export default CheckInfo;
