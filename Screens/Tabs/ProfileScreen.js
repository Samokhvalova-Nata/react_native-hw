import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/vars";
import { getPosts } from "../../redux/post/postSelectors";
import { getUserName } from "../../redux/auth/authSelectors";
import { logout } from "../../redux/auth/authOperations";
import Background from "../../Components/Background/Background";
import PostProfileItem from "../../Components/Posts/PostProfileItem";
import Avatar from "../../Components/Avatar/Avatar";
import MainButton from "../../Components/Buttons/MainButton";


export default function ProfileScreen() {
    const navigation = useNavigation();
    const posts = useSelector(getPosts);
    const name = useSelector(getUserName);
    const dispatch = useDispatch();

    return (
        <>
            <Background />
            <ScrollView>
                <View style={styles.container}>
                    <Feather
                        name="log-out" size={24}
                        color={COLORS.secondaryText}
                        style={{ position: 'absolute',
                                top: 22,
                                right: 16 }}
                        onPress={() => dispatch(logout())} />
                    <Avatar/>
                    <Text style={styles.title}>{name}</Text>

                    {(posts.length !== 0)
                        ? 
                        (posts.map(({ id, title, comments, location, photo, likes }) => (
                            <PostProfileItem
                                key={id}
                                title={title}
                                comments={comments}
                                likes={likes}
                                location={location}
                                url={photo}
                            />)))
                        : (
                            <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 16 }}>
                                <Text style={styles.text}>Ще немає публікацій</Text>
                                <MainButton text='Створити публікацію'
                                    onPress={() => navigation.navigate("CreatePostsScreen")}/>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        paddingTop: 92,
        paddingBottom: 45,
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: COLORS.mainBcg,
        marginTop: 147,
        minHeight: Dimensions.get("window").height - 147,
    },
    title: {
        fontFamily: "Roboto-Medium",
        color: COLORS.mainText,
        fontSize: 30,
        textAlign: "center",
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        textAlign: 'center',
    },
});