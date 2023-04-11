import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { StackActions } from "@react-navigation/native";
import { baseUrl } from "@env";
import axios from "axios";

const ScanID = ({ route, navigation }) => {
  const [image, setImage] = useState(null); //รูปบัตรปปช.
  const [base64Image, setBase64Image] = useState(null);
  const [data, setData] = useState(null);
  console.log(image);
  //   console.log(base64Image);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result)
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      convertImageToBase64(result.assets[0].uri);
    }
  };

  const convertImageToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setBase64Image(base64);
  };

  const sendData = async () => {
    try {
      // console.log('test');
      let response = await axios.post(
        `http://we-solved.thddns.net:5509/process-image`,
        { image: base64Image }
      );
      if (response.status === 200) {
        setData(response.data);
        navigation.dispatch(StackActions.replace("CheckInfo", { data: data }));
      } else {
        alert("ข้อมูลผิดพลาด");
      }
      // console.log(response.data)
    } catch (error) {
      console.log("error");
      console.error(error);
    }
    // navigation.dispatch(StackActions.replace("CheckInfo", { data: data }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.start}>
        {!image && (
          <>
            <Text
              style={{
                color: "#373736",
                marginLeft: 15,
                fontWeight: "bold",
                marginBottom: 10,
                fontSize: 20,
                textAlign: "left",
                alignSelf: "flex-start",
                marginLeft: 30,
              }}
            >
              เริ่มต้นใช้งาน
            </Text>
          </>
        )}
        {image && (
          <>
            <Text
              style={{ marginLeft: 15, fontWeight: "bold", marginBottom: 15 }}
            >
              รูปบัตรประชาชน{" "}
            </Text>
            <View
              style={{
                borderWidth: 1,
                width: "90%",
                height: "50%",
                borderRadius: 15,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
              />
            </View>
          </>
        )}
        {!image && (
          <TouchableOpacity
            style={{
              textAlign: "center",
              padding: 10,
              borderRadius: 10,
              margin: 10,
              width: "80%",
              backgroundColor: "#A3E5E7",
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={() => {
              PickImage();
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
            >
              แสกนบัตรประชาชน
            </Text>
          </TouchableOpacity>
        )}
        {image && (
          <TouchableOpacity
            style={{
              textAlign: "center",
              padding: 10,
              borderRadius: 10,
              margin: 10,
              width: "80%",
              backgroundColor: "#A3E5E7",
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={() => {
              sendData();
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
            >
              ตรวจสอบข้อมูล
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  start: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: "20%",
  },
});
export default ScanID;
