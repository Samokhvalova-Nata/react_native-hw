import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import RegisterScreen from './Screens/AuthScreens/RegistrationScreen';
import HomeScreen from './Screens/HomeScreen';

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen options={{
          headerShown: false,
          }}
          name="Login" component={LoginScreen} />
        <MainStack.Screen options={{
          headerShown: false,
          }}
          name="Registration" component={RegisterScreen} />
        <MainStack.Screen options={{
          headerShown: false,
          }}
          name="Home" component={HomeScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
    
  );
};
