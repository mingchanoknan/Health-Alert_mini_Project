import { StyleSheet, View, Image, FlatList, Button, TouchableOpacity } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "@env";

const Alarm = ({navigation}) => {
  const [dataMedicine, setDataMedicine] = useState();
  const [currentTime, setCurrentTime] = useState();
  useFocusEffect(
    useCallback(() => {
      const getMedicine = async () => {
        const id = 2
        const response = await axios.get(`${baseUrl}/getMedicineToEat/${id}`)
        setDataMedicine(response.data)
        // console.log(response.data)
      }
      getMedicine();
      const time = new Date()
      let time_hhmm = time.getHours() + ":" + time.getMinutes();
      setCurrentTime(time_hhmm)
    },[])

  )

  const Item = ({medicine}) => (

    <View style={{ flexDirection: "row", marginTop: 10,marginLeft:20,position: 'relative'}}>
      <Image
        style={{ width: 150, height: 150, borderRadius: 150/2 }}
        source={{
          uri: medicine.medicine_image,
        }}
      />
      <View style={{justifyContent:"center"}}>
      <Text
        style={{
          color: "rgba(255, 255, 255, 0.8)",
            marginLeft: 10,
        }}
        category="h5">
        {medicine.medicine_name}
      </Text>
      <Text
      style={{
        color: "rgba(255, 255, 255, 0.8)",
            marginLeft: 10,
      }}
      category="h5">
      {medicine.amount_per_time} เม็ด
      </Text>
      </View>
      {/* <Text
        style={{
          color: "rgba(255, 255, 255, 0.8)",
          alignSelf: "center",
          marginLeft: 15,
        }}
        category="h5">
        {medicine.medicine_name}
      </Text>
      <Text
      style={{
        color: "rgba(255, 255, 255, 0.8)",
        alignSelf: "center",
        marginLeft: 15,
          flex: 1,
      }}
      category="h5">
      {medicine.amount_per_time} เม็ด
      </Text> */}
     </View>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "rgba(255, 255, 255, 0.7)",
          textAlign: "center",
          marginTop: "15%",
        }}
        category="h1"
      >
        {currentTime}
      </Text>
      <Text
        style={{
          color: "rgba(253, 45, 45, 1)",
          textAlign: "center",
          marginTop: "5%",
        }}
        category="h1"
      >
        แจ้งเตือนทานยา
      </Text>
      <Text
        style={{
          color: "rgba(255, 255, 255, 0.8)",
          marginLeft: 15,
          marginTop: 10,
        }}
        category="h4"
      >
        ยาที่ต้องทาน ณ ตอนนี้
      </Text>
      <FlatList
        data={dataMedicine}
        renderItem={({ item }) => <Item medicine={item} />}
        keyExtractor={(item) => item.medicine_id}
          />
      <TouchableOpacity style={{ backgroundColor: '#EC910A', alignItems: 'center', padding: 10, width: "50%", borderRadius: "100%", alignSelf: "center", marginBottom: 10 }}
        onPress={() => {
        navigation.navigate("Home")
      }}>
              <Text style={{color:"#FFFFFF"}} category="h5">ทานยาเรียบร้อย</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#373736', alignItems: 'center',padding:10,width:"30%",borderRadius:"100%",alignSelf:"center",marginBottom:20}}>
              <Text style={{color:"#FFFFFF"}} category="p1">เลื่อน 15 นาที</Text>
          </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
export default Alarm;
