import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  LogBox,
  Alert,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  AntDesign
} from "@expo/vector-icons";
import BoxListDrugs from "../component/BoxListDrugs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { REMINDER } from "../dummy/Reminder";
import { baseUrl } from "@env";
import axios from "axios";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Home = ({ navigation }) => {
  // const { name, id } = route.params;
  // console.log(name);
  const [user, setUser] = useState();
  // console.log(user);
  const [name,setName] = useState()
  const [loading, setLoading] = useState(true);
  const logout = useNavigation();

  const handlePress = async() => {
    logout.reset({
      index: 0,
      routes: [{ name: "Scan" }],
    });
      await removeData()
      console.log("remove")
  };


    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        const obj = JSON.parse(jsonValue)
        // console.log(obj)
        if (jsonValue != null) {
          return obj
        }
        else {
          return null
        }
      } catch(e) {
        console.log("error")
        console.log(e)
      }
  }
  
  const removeData = async() => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      console.log( getData())
    } catch (error) {
      console.log('Error removing data: ', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
            try {
              const infoUser = await getData()
                setName(infoUser.firstName+" "+infoUser.lastName)
                let response = await axios.get(`${baseUrl}/timeToEatMedicineComing/${infoUser.patient_id}`)
                // let response = await axios.get(`http://54.163.234.235:3000/getRemider/${idcard}`)
                setUser(response.data);
                 console.log("test "+response.data.length)
            }
            catch(error) {
              console.log('error');
              console.error(error)
            }
          };
          fetchUsers();
    },[])
  )

  // useFocusEffect(
  //   useCallback(() => {
  //   // const url = `https://example.com/api/data`;
  //   const fetchUsers = async () => {
  //     try {
  //       const infoUser = await getData()
  //         setName(infoUser.firstName+" "+infoUser.lastName)
  //         let response = await axios.get(`${baseUrl}/timeToEatMedicineComing/${infoUser.patient_id}`)
  //         // let response = await axios.get(`http://54.163.234.235:3000/getRemider/${idcard}`)
  //         setUser(response.data);
  //          console.log("test "+response.data.length)
  //     }
  //     catch(error) {
  //       console.log('error');
  //       console.error(error)
  //     }
  //   };
  //   fetchUsers();
    
  // }), []);

  const renderGridItem = ({ item }) => {
    // console.log("test ");
    return <BoxListDrugs item={item} numberOfLines={1} />;
  };


  //Notification
  const requestNotificationPermission = async (hhmmss) => {
    if(!isNaN(parseInt(hhmmss[0])) && !isNaN(parseInt(hhmmss[1])) && !isNaN(parseInt(hhmmss[2]))){
    const { status } = await Notifications.requestPermissionsAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      try {
        await Notifications.scheduleNotificationAsync({
        content: {
          title: 'แจ้งเตือนการกินยา',
          body: 'ได้เวลากินยาแล้วค่ะ!',
        },
          // trigger:null
          trigger:
        {
          date: new Date().setHours(parseInt(hhmmss[0]), parseInt(hhmmss[1]), parseInt(hhmmss[2]))
          
        },
        });
      }
      catch (err) {
        console.log(err)
      }
      
      Notifications.addNotificationResponseReceivedListener(handleNotificationClick);
    } else {
      alert('You need to grant permission to receive notifications');
    }
  }
  };

  const handleNotificationClick = (notification) => {
    navigation.navigate("alarm");
  };
  useEffect(() => {
    const getTimeForAlert = async () => {
      let promises = ""
      const infoUser = await getData()
      const response = await axios.get(`${baseUrl}/getEdableTimebyId/${infoUser.patient_id}`);
      console.log(response.data)
      if (response.data.length > 0){
        const hhmmssValues = response.data.map(x => x.split(":"));
        promises = hhmmssValues.map(hhmmss => requestNotificationPermission(hhmmss));
      }
      // requestNotificationPermission(["00","07","00"])
      if (promises != "") {
        await Promise.all(promises);
      }
      
    };
    getTimeForAlert();
    
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../../assets/bg_menu2.png")}
        style={styles.background}
      ></Image>

      <View style={styles.header}>
        <AntDesign 
          name="logout"
          size={24}
          color="black"
          onPress={() => {
            Alert.alert("ต้องการออกจากระบบหรือไม่", undefined, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "Yes", onPress: () => handlePress() },
            ]);
          }}
          style={{flexDirection: 'row', alignSelf: 'flex-end', top: '-5%', marginRight: "5%" }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "#373736",
          }}
        >
          {" "}
          สวัสดี{" "}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#373736",
          }}
        >
          {" "}
          {name}{" "}
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          height: "30%",
          alignItems: "center",
          justifyContent: "center",
          left: 20,
          top: "20%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingLeft: 10,
            paddingRight: 10,
            // backgroundColor:'pink',
          }}
        >
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Medicine")}
          >
            <Image
              source={require("../../assets/drugs.png")}
              style={{ width: "30%", height: "40%" }}
            ></Image>
            <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
              รายการยา
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Image
              source={require("../../assets/apppoint.png")}
              style={{ width: "30%", height: "40%" }}
            ></Image>
            <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
              นัดหมาย
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Image
              source={require("../../assets/info.png")}
              style={{ width: "30%", height: "40%" }}
            />
            <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
              ข้อมูลสุขภาพ
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingLeft: 10,
            paddingRight: 10,
            top: "-10%",
          }}
        >
          <TouchableOpacity style={styles.box}>
            <Image
              source={require("../../assets/history.png")}
              style={{ width: "30%", height: "40%" }}
            ></Image>
            <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
              ประวัติการรักษา
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}>
            <Image
              source={require("../../assets/doctor.png")}
              style={{ width: "30%", height: "40%" }}
            ></Image>
            <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
              แพทย์ผู้ดูแล
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box}
            onPress={() => {
              Notifications.cancelAllScheduledNotificationsAsync()
              console.log("cancelAllScheduledNoti")
            }}>
            <Image
              source={require("../../assets/other.png")}
              style={{ width: "30%", height: "40%" }}
              
            ></Image>
            <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
              คำแนะนำ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {user && (
      <View
        style={{
          backgroundColor: "white",
          zIndex: -100,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          height: "55%",
          top: "-5%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#373736",
            margin: 26,
          }}
        >
          {" "}
          รายการแจ้งเตือนที่ใกล้จะถึง..{" "}
        </Text>
        <View style={{ flex: 3 }}>

        { user.length > 0 && (
          <FlatList
            data={user}
            renderItem={renderGridItem}
            numColumns={1}
            keyExtractor={(item) => item.medicine_id}
          />
        )}
        { user.length == 0 && ( 
          <Text style={{fontWeight: 'bold', textAlign: 'center', color:'gray'}}>- ไม่มีรายการยาที่ต้องกินในวันนี้แล้วค่ะ-</Text>
        )}
        </View>
      </View>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    zIndex: -100,
    height: "50%",
  },
  header: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-start",
    top: "6%",
    margin: 20,
    paddingLeft: 20,
    zIndex: 100,
    width: "90%"
  },
  container: {
    flex: 1,
  },
  txt: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    color: "#373736",
  },
  box: {
    width: "28%",
    height: "65%",
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 7,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default Home;
