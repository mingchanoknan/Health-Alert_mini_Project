import { StyleSheet, View, Image, FlatList, Button, TouchableOpacity } from "react-native";
import { Text, Layout } from "@ui-kitten/components";

const Alarm = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  const Item = ({ title }) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Image
        style={{ width: 150, height: 150, borderRadius: 150/2 }}
        source={{
          uri: "https://media.discordapp.net/attachments/1090253725647523921/1093960018778402917/anticoagulant-and-antiplatelet-drugs_thumb-1-732x549.png?width=582&height=436",
        }}
      />
      <Text
        style={{
          color: "rgba(255, 255, 255, 0.8)",
          alignSelf: "center",
          marginLeft: 15,
        }}
        category="h4"
      >
        {title}
      </Text>
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
        13:00
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
      {/* <View style={{ flexDirection: 'row',marginTop:10}}>
                <Image style={{width:150,height:150, borderRadius:'100%'}} source={{
                    uri: 'https://media.discordapp.net/attachments/1090253725647523921/1093960018778402917/anticoagulant-and-antiplatelet-drugs_thumb-1-732x549.png?width=582&height=436',
                }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)',alignSelf: 'center', marginLeft: 15}} category='h4'>123</Text>
            </View> */}

      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
          />
          <TouchableOpacity style={{ backgroundColor: '#EC910A', alignItems: 'center',padding:10,width:"50%",borderRadius:"100%",alignSelf:"center",marginBottom:10}}>
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
