import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image, ScrollView, FlatList
} from "react-native";
import BoxListDrugs from "../component/BoxListDrugs"
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { baseUrl } from "@env";
import axios from "axios";

const Home = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const url = `http://172.20.10.6:3000/getListDrugs/`;
    
    const fetchUsers = async () => {
      // try {
      //   console.log(url);
      //   const response = await axios.get(url);
      //   if (response.status === 200) {
      //     setUser(response.data);
      //     console.log("POPO")
      //     console.log(response.data);
      //     return;
      //   } else {
      //     throw new Error("Failed to fetch users drugs");
      //   }
      // } catch (error) {
      //   console.log("Data fetching cancelled drugs2");
      // }
     axios.get(url)
     .then(res => {
      console.log(res);
      console.log(res.data)
       })
      .catch(error => console.log(error));
    };
    fetchUsers();
  }, []);

  const renderGridItem = ({itemData}) => {
    // console.log(itemData);
    return <BoxListDrugs item={itemData} width={"85%"} numberOfLines={1} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
    
      <Image
        source={require("../../assets/bg_menu2.png")}
        style={styles.background}
      ></Image>
      
      <View style={styles.header}>
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
          นายสมชาย เกียรติดี{" "}
        </Text>
      </View>

      <View style={{position: 'absolute', height: "30%", alignItems: 'center', justifyContent: "center",  left: 20, top:"20%"}}>
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
            >
              <Image
                source={require("../../assets/drugs.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
                รายการยา
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
            >
              <Image
                source={require("../../assets/apppoint.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
                นัดหมาย
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
            >
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
              top: "-10%"
              // backgroundColor:'green',
            }}
          >
            <TouchableOpacity
              style={styles.box}
            >
              <Image
                source={require("../../assets/history.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
                ประวัติการรักษา
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
            >
              <Image
                source={require("../../assets/doctor.png")}
                style={{ width: "30%", height: "40%" }}
              ></Image>
              <Text style={{ fontWeight: "bold", top: 5, fontSize: 12 }}>
                แพทย์ผู้ดูแล
              </Text>


            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
            >
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

      {/* <View style={{backgroundColor: 'red', flex:1, position: "absolute", zIndex: -20 }}>

      </View>  */}
      <View style={{backgroundColor: 'white', zIndex: -100, borderTopLeftRadius: 50, borderTopRightRadius: 50, height: "55%", top: "-5%"}}>
      <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#373736",
            margin: 26
          }}
        >
          {" "}
          รายการแจ้งเตือนที่ใกล้จะถึง..{" "}
        </Text>
      {/* <ScrollView style={{ flex: 1 }}>
      
      </ScrollView> */}
      <View style={{ flex: 3 }}>
      <Text>Hello</Text>
      <FlatList
            data={user}
            renderItem={renderGridItem}
            numColumns={1}
            keyExtractor={(item) => item.medicine_id}
            navigation={navigation}
          />
           <Text>Hello2</Text>
      </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    zIndex: -100,
    height: "50%"
  },
  header: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-start",
    top: "6%",
    margin: 20,
    left: 20,
    zIndex: 100,
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
