import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { COLORS } from "./../common/vars";
import PostsScreen from "././Tabs/PostsScreen";
import CreatePostsScreen from "././Tabs/CreatePostsScreen";
import ProfileScreen from "././Tabs/ProfileScreen";


const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <Tabs.Navigator initialRouteName="CreatePostsScreen"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerTitleAlign: "center",
                headerStyle: styles.header,
                headerTitleStyle: styles.title,
                tabBarStyle: styles.tab,

                tabBarIcon: ({ focused }) => {
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
                    headerRight: () => (
                        <Feather name="log-out" size={24} color={COLORS.secondaryText} style={{ marginRight: 10 }}
                        onPress={() => navigation.navigate("Login")}/>
                    )
                }} />
            <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen}
                options={{
                    title: "Створити публікацію",
                    tabBarStyle: {
                        display: "none",
                    },
                    headerLeft: () => (
                        <Feather name="arrow-left" size={24} color={'#212121CC'} style={{ marginLeft: 10 }}
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
    header: {
        height: 88,
    },
    title: {
        fontWeight: 500,
        fontSize: 17,
        letterSpacing: -0.4,
        textAlign: "center",
        color: COLORS.mainText,
    },
    tab: {
        paddingHorizontal: 50,
        height: 71,
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