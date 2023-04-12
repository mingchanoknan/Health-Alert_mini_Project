import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import CheckInfo from "./app/screen/checkInfo";
import BoxListDrugs from './app/component/BoxListDrugs';
import Home from "./app/screen/menu";
import Scan from "./app/screen/scanIDCard"
import AppNavigation from './app/navigation/AppNavigation';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export default function App() {
  const [userFromApp, setUserFromApp] = useState(null);
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <AppNavigation setUserFromApp={setUserFromApp}/>
      </NavigationContainer>
    </ApplicationProvider>
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
