import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CheckInfo from "../screen/checkInfo";
import Home from "../screen/menu";
import Medicine from "../screen/medicine";
import { View, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Fontisto, Entypo
} from "@expo/vector-icons";
const LoginNavigation = (props) => {
  const LoginNavigator = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  const MyBottomTab = () => {
    return (
      <BottomTabs.Navigator initialRouteName="Drugs" screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
        };
      }}>
        <BottomTabs.Screen
          name="Menu"
          component={Medicine}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Entypo name="home" size={24} color={color} />;
            },
            tabBarLabel: () => {
              return <Text style={{ fontSize: 12 }}>หน้าหลัก</Text>;
            },
          }}
        />
        <BottomTabs.Screen
          name="Drugs"
          component={Medicine}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Fontisto name="drug-pack" size={24} color={color} />;
            },
            tabBarLabel: () => {
              return <Text style={{ fontSize: 12 }}>รายการยา</Text>;
            },
          }}
        />
        <BottomTabs.Screen
          name="Appoint"
          component={Medicine}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="medical-bag"
                  size={24}
                  color={color}
                />
              );
            },
            tabBarLabel: () => {
              return <Text style={{ fontSize: 12 }}>นัดหมาย</Text>;
            },
          }}
        />
        <BottomTabs.Screen
          name="Noti"
          component={Medicine}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={color}
                />
              );
            },
            tabBarLabel: () => {
              return <Text style={{ fontSize: 12 }}>แจ้งเตือน</Text>;
            },
          }}
        />
        <BottomTabs.Screen
          name="User"
          component={Medicine}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <FontAwesome name="user-circle-o" size={24} color={color} />
              );
            },
            tabBarLabel: ({ color, size }) => {
              return <Text color={color} style={{ fontSize: 12 }}>ข้อมูลส่วนตัว</Text>;
            },
          }}
        />
      </BottomTabs.Navigator>
    );
  };

  return (
    <LoginNavigator.Navigator
      initialRouteName="CheckInfo"
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
          // headerStyle: { backgroundColor: '#47C5FC'},
          // headerTintColor : 'white',
        };
      }}
      r
    >
      <LoginNavigator.Screen name="CheckInfo" component={CheckInfo} />
      <LoginNavigator.Screen name="Home" component={Home} />
      <LoginNavigator.Screen name="Medicine" component={MyBottomTab} />
    </LoginNavigator.Navigator>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 50,
    top: "40%",
    alignSelf: "center",
  },
});
export default LoginNavigation;
