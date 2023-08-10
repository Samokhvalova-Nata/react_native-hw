import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { COLORS } from "./common/vars";
import LoginScreen from "./Screens/AuthScreens/LoginScreen";
import RegisterScreen from "./Screens/AuthScreens/RegistrationScreen";
import HomeScreen from "./Screens/HomeScreen";
import CommentsScreen from "./Screens/NestedScreens/CommentsScreen";
import MapScreen from "./Screens/NestedScreens/MapScreen";

const MainStack = createStackNavigator();

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
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
            </MainStack.Navigator>
        );
    }
    return (
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
    )
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
