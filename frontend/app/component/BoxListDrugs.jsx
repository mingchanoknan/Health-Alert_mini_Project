import React, { useState } from "react";
import {
  Card,
  Text
} from "@ui-kitten/components";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { baseUrl } from "@env";
import axios from "axios";

const BoxParcelTenant = ({ item, width}) => {
  const [image, setImage] = useState(item.item.medicine_image);
  const [time, setTime] = useState(item.item.period);
  const [medicine, setMedicine] = useState(item.item.medicine_name);
  const [amount, setsetAmount] = useState(item.item.amount_per_time);


  return (
    <View style={[styles.shadow]}>
      <Card disabled={true} style={[styles.card, { width }]}>
        <View style={{flexDirection: 'row'}}>
        <Image
            resizeMode="cover"
            source={image}
          />
           <Text >{medicine}</Text>
        </View>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: "40%",
    borderWidth: 0,
    alignSelf: "center",
    height: 130,
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
  }
});

export default BoxParcelTenant;