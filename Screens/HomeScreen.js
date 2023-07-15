import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, } from 'react-native';
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="PostsScreen" component={PostsScreen} options={{
                title: "Публікації"
            }} />
            <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen} options={{
                title: "Створити публікацію"
            }}/>
            <Tabs.Screen name="ProfileScreen" component={ProfileScreen} options={{
                headerShown: false,
            }}/>

        </Tabs.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: 'Roboto-Medium',
        color: "#212121",
        marginBottom: 33,
        fontSize: 30,
        textAlign: "center",
    },
});