import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BoxListDrugs from "../component/BoxListMedicine";
import { MEDICINE } from "../dummy/Medicine";
import Search from "../component/SearchBar";
import { baseUrl } from "@env";
import axios from "axios";

const Medicine = ({ route, navigation }) => {
  const [user, setUser] = useState(MEDICINE);
  const [all, setAll] = useState(MEDICINE);
  // console.log(user);
  const [loading, setLoading] = useState(true);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const url = `https://example.com/api/data`;

    const fetchUsers = async () => {
      try {
        // console.log('test');
          let response = await axios.get("http://54.163.234.235:3000/getListDrugs")
          setUser(response.data);
          setAll(response.data);
          // console.log(response.data)
      }
      catch(error) {
        console.log('error');
        console.error(error)
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (user != null) {
      let newUser = [...all];
      const textData = searchPhrase;
      if (searchPhrase != "") {
        const newData = newUser.filter((item) => {
        const itemData = item.medicine_name;
          return itemData.indexOf(textData) > -1;
        });
        newUser = newData;
      }
      setUser(newUser);
    }
  }, [searchPhrase]);

  const renderGridItem = ({ item }) => {
    // console.log("test ");
    return <BoxListDrugs item={item} numberOfLines={1} />;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Image
        source={require("../../assets/bg_medicine.png")}
        style={styles.background}
      ></Image>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          top: "-5%",
        }}
      >
        {" "}
        รายการยา{" "}
      </Text>
      <View
        style={{
          zIndex: -100,
          height: "100%",
          top: "-2%",
        }}
      >
        <View style={{ top: "-1%", margin: 10, padding: 5 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#373736",
              marginBottom: 5,
            }}
          >
            {" "}
            รายการยาปัจจุบัน{" "}
          </Text>
          <Search
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
        <View style={{ flex: 3 }}>
          <FlatList
            data={user}
            renderItem={renderGridItem}
            numColumns={1}
            keyExtractor={(item) => item.medicine_id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    zIndex: -100,
    height: "12%",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  header: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "4%",
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
export default Medicine;