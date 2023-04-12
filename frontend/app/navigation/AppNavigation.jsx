import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationAlarm from "../screen/Notification";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import Alarm from "../screen/Alarm";
import Home from "../screen/menu";
import Medicine from "../screen/medicine";
import CheckInfo from "../screen/checkInfo";
import ScanID from "../screen/scanIDCard";
import { useCallback } from "react";
const AppNavigation = () => {
  const AppNavigator = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  const handleTabPress = (route, navigation) => {
    console.log(`Tab ${route.name} pressed`);
    // Perform any action you want here
    navigation.navigate("Home")
  };
  const MyBottomTab = ({ navigation }) => {
    const gotoScreen = useCallback((screenName) => {
      navigation.navigate(screenName);
    }, [navigation]);
    return (
      <BottomTabs.Navigator
        initialRouteName="Drugs"
        screenOptions={({ route, navigation }) => {
          return {
            headerShown: false,
          };
        }}
      >
        <BottomTabs.Screen
            name="Menu"
            component={Home}
          options={({ route, navigation }) => ({
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  onPress={() => handleTabPress(route, navigation)}
              >
                  <Entypo name="home" size={24} />
                  <Text>หน้าหลัก</Text>
                </TouchableOpacity>
              ),
            })}
        >
          </BottomTabs.Screen>
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
              return (
                <Text color={color} style={{ fontSize: 12 }}>
                  ข้อมูลส่วนตัว
                </Text>
              );
            },
          }}
        />
      </BottomTabs.Navigator>
    );
  };

  

  return (
    <AppNavigator.Navigator
      initialRouteName="Scan"
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
        };
      }}
    >
      <AppNavigator.Screen name="Scan" component={ScanID} />
      <AppNavigator.Screen name="CheckInfo" component={CheckInfo} />
      <AppNavigator.Screen name="Home" component={Home} />
      <AppNavigator.Screen name="Medicine" component={MyBottomTab} />
      {/* <AppNavigator.Screen name="notificaton" component={NotificationAlarm} /> */}
      <AppNavigator.Screen name="alarm" component={Alarm} />
    </AppNavigator.Navigator>
  );
};

export default AppNavigation;
