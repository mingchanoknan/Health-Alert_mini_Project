import React, { useState } from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { baseUrl } from "@env";
import axios from "axios";

const BoxListMedicine = (item) => {
  const [img, seItmg] = useState(item.item.medicine_image);
  const [medicine, setMedicine] = useState(item.item.medicine_name);
  const [amount, setAmount] = useState(item.item.amount_per_time);
  const [period, setPeriod] = useState(item.item.period);
  const [treatment, setTreatment] = useState(item.item.treatment);

  return (
    <Card style={styles.card}>
      <Card.Content style={{ flexDirection: "row" }}>
        <Card.Cover
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{
            uri: img,
          }}
        />
        <Card.Content style={{ flexDirection: "column", width: "80%" }}>
          <Text variant="titleMedium" style={{ color: "white" }}>
            {medicine}
          </Text>
          <Card.Content style={{ flexDirection: "row" }}>
            <FontAwesome
              style={{ top: 5, marginRight: 5, left: -10 }}
              name="heartbeat"
              size={14}
              color="white"
            />
            <Text variant="bodySmall" style={{ left: -10 }}>
              {treatment}
            </Text>
          </Card.Content>
          <Text variant="bodySmall">รับประทาน{period}</Text>
          <Text variant="bodySmall">รับประทานครั้งละ {amount} เม็ด</Text>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // top: "80%",
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
    padding: 5,
    backgroundColor: "#9dcfe3",
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

export default BoxListMedicine;
