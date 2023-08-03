import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import RegisterScreen from './Screens/AuthScreens/RegistrationScreen';
import HomeScreen from './Screens/HomeScreen';
// import { useState } from 'react';
import CommentsScreen from './Screens/CommentsScreen';
import MapScreen from './Screens/MapScreen';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const MainStack = createStackNavigator();

// const useRoute = (isAuth) => {
//     if (!isAuth) {
//       return (<>
//         <MainStack.Screen options={{
//           headerShown: false,
//           }}
//           name="Login" component={LoginScreen} />
//         <MainStack.Screen options={{
//           headerShown: false,
//           }}
//           name="Registration" component={RegisterScreen} />
//       </>
//       )
//     } 
//     return (
//       <MainStack.Screen options={{
//           headerShown: false,
//           }}
//           name="Home" component={HomeScreen} />
//     )
//   }

export default function App() {
  // const [isAuth, setIsAuth] = useState({});
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // const routing = useRoute(isAuth);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Home">
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
                headerShown: true,
                title: "Коментарі",
                headerTintColor: "#212121",
                headerTitleStyle: {
                  fontWeight: 500,
                  fontSize: 17,
                  textAlign: "center",
                },
              }}
              name="Comments"
              component={CommentsScreen}
            />
            <MainStack.Screen
              options={{
                headerShown: false,
              }}
              name="Map"
              component={MapScreen}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
