import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationAlarm from '../screen/Notification';
import Alarm from '../screen/Alarm';
import Home from "../screen/menu";
import CheckInfo from "../screen/checkInfo";
const AppNavigation = () => {
    const AppNavigator = createNativeStackNavigator();
    return (
        <AppNavigator.Navigator
            screenOptions={({ route, navigation }) => {
                return {
                    headerShown: false,
                }
            }} >
            <AppNavigator.Screen name="CheckInfo" component={CheckInfo}/>
                <AppNavigator.Screen name="Home" component={Home} />
                <AppNavigator.Screen name="notificaton" component={NotificationAlarm} />
                <AppNavigator.Screen name="test" component={ Alarm } />
            </AppNavigator.Navigator>
    )
}

export default AppNavigation;