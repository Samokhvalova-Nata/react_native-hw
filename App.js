import 'react-native-gesture-handler';
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
// import { persistor, store } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
import { COLORS } from "./common/vars";
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import RegisterScreen from './Screens/AuthScreens/RegistrationScreen';
import HomeScreen from './Screens/HomeScreen';
import CommentsScreen from "./Screens/NestedScreens/CommentsScreen";
import MapScreen from "./Screens/NestedScreens/MapScreen";


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
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
          }}
        >
          <MainStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <MainStack.Screen
            options={{
              headerShown: false,
            }}
            name="Registration"
            component={RegisterScreen}
          />
          <MainStack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={HomeScreen}
          />
          <MainStack.Screen
            options={{
              title: "Коментарі",
            }}
            name="Comments"
            component={CommentsScreen}
          />
          <MainStack.Screen
            options={{
              title: "Мапа",
            }}
            name="Map"
            component={MapScreen}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      <Toast topOffset={40} />
      {/* </PersistGate> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 500,
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: "center",
    color: COLORS.mainText,
  },
});