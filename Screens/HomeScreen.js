import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, } from 'react-native';
import PostsScreen from "././Tabs/PostsScreen";
import CreatePostsScreen from "././Tabs/CreatePostsScreen";
import ProfileScreen from "././Tabs/ProfileScreen";
// import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "./../common/vars";


const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <Tabs.Navigator
            initialRouteName="CreatePostsScreen"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerTitleAlign: "center",
                headerStyle: styles.header,
                
                tabBarStyle: {
                    paddingHorizontal: 50,
                    height: 71,
                },

                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === "PostsScreen") {
                        iconName = "grid"
                    }
                    if (route.name === "CreatePostsScreen") {
                        iconName = "plus"
                    }
                    if (route.name === "ProfileScreen") {
                        iconName = "user"
                    } 

                    return (
                        <View style={{
                            ...styles.iconsTab,
                            backgroundColor: focused ? COLORS.accent : COLORS.mainBcg,
                        }}>
                            <Feather
                                name={iconName}
                                size={24}
                                color={focused ? COLORS.mainBcg : COLORS.mainText}
                            />
                        </View>
                    )
                },
            })}
        >
            
            <Tabs.Screen name="PostsScreen" component={PostsScreen}
                options={{
                    title: "Публікації",
                    headerTintColor: "#212121",
                    headerTitleStyle: {
                        fontWeight: 500,
                        fontSize: 17,
                        textAlign: 'center',
                    },

                    headerRight: () => (
                        <Feather name="log-out" size={24} color={COLORS.secondaryText} style={{ marginRight: 10 }}
                        onPress={() => navigation.navigate("Login")} />
                        
                    )
                }} />
            <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen}
                options={{
                    title: "Створити публікацію",
                    headerTintColor: "#212121",
                    headerTitleStyle: {
                        fontWeight: 500,
                        fontSize: 17,
                        textAlign: 'center',
                    },
                    // tabBarStyle: {
                    //     display: "none",
                    // },
                    headerLeft: () => (
                        <Feather name="arrow-left" size={24} color={COLORS.secondaryText} style={{ marginLeft: 10 }}
                        onPress={() => navigation.navigate("PostsScreen")} />
                    )
                }}/>
            <Tabs.Screen name="ProfileScreen" component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tabs.Navigator>
    )
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     paddingHorizontal: 16,
    //     backgroundColor: '#FFFFFF',
    //     borderTopWidth: 0.5,
    //     borderBottomWidth: -0.5,
    //     borderTopColor: 'rgba(0, 0, 0, 0.30)',
    //     borderBottomColor: 'rgba(0, 0, 0, 0.30)',
    // },
    header: {
        height: 88,
        
    },
    title: {
        fontFamily: 'Roboto-Medium',
        color: "#212121",
        marginBottom: 33,
        fontSize: 30,
        textAlign: "center",
    },
    iconsTab: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 39,
        borderRadius: 22,
        width: 70,
        height: 40,
        padding: 8,
    },
});