import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/vars";
import CommentsScreen from "./../NestedScreens/CommentsScreen";
import MapScreen from "./../NestedScreens/MapScreen";
import DefaultPostScreen from "../NestedScreens/DefaultPostsScreen";

const NestedStack = createStackNavigator();


export default function PostsScreen() {
    const navigation = useNavigation();

    return (
        <NestedStack.Navigator screenOptions={{
            headerTitleAlign: "center",
                headerStyle: styles.header,
                headerTitleStyle: styles.title,
            
            }}>
            <NestedStack.Screen 
                options={{
                    title: "Публікації",
                    headerRight: () => (
                        <Feather name="log-out" size={24} color={COLORS.secondaryText} style={{ marginRight: 10 }}
                        onPress={() => navigation.navigate("Login")}/>
                    )
                }}
                name="DefaultPostScreen"
                component={DefaultPostScreen}
            />
            <NestedStack.Screen options={{
                title: "Коментарі",
                
            }}
                name="Comments"
                component={CommentsScreen} />
            <NestedStack.Screen options={{
                // headerShown: false,
                title: "Мапа",
            }}
                name="Map"
                component={MapScreen} />
        </NestedStack.Navigator>
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