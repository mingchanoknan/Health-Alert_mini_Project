import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CheckInfo from "../screen/checkInfo";
import Home from "../screen/menu";
import { View, Text, Image, StyleSheet } from "react-native";

const LoginNavigation = (props) => {
  const LoginNavigator = createNativeStackNavigator();

  return (
    <LoginNavigator.Navigator
      initialRouteName="CheckInfo"
      screenOptions={({ route, navigation }) => {
        return {
          headerShown: false,
          // headerStyle: { backgroundColor: '#47C5FC'},
          // headerTintColor : 'white',
        };
      }}r
      
    >
      <LoginNavigator.Screen name="CheckInfo" component={CheckInfo} 
      
      />
      <LoginNavigator.Screen name="Home" component={Home} 
    />
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