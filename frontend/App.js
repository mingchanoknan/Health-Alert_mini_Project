import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import CheckInfo from "./app/screen/checkInfo";
import LoginNavigation  from './app/navigation/LoginNavigation';
import BoxListDrugs from './app/component/BoxListDrugs';
import Home from "./app/screen/menu";

export default function App() {
  return (
    <NavigationContainer>
      {/* <Home/> */}
      {/* <CheckInfo/> */}
      <LoginNavigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
