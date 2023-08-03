import React from "react";
import { useSelector } from "react-redux";
import { COLORS } from "../../common/vars";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Background from "../../Components/Background/Background";
import PostItem from "../../Components/PostItem/PostItem";
import { getPosts } from "../../redux/post/postSelectors";
import { getUserName } from "../../redux/auth/authSelectors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const posts = useSelector(getPosts);
    const name = useSelector(getUserName);
    const [avatar, setAvatar] = useState(true);

    const handleAvatarBtn = () => {
        setAvatar(!avatar)
    };

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
                        onPress={() => navigation.navigate("Login")} />

                    <View style={styles.avatarWrap}>
                            {avatar && 
                            <Image source={require("../../assets/images/avatar.jpg")}
                                alt="User photo"
                                style={styles.avatar}/>}
                            <TouchableOpacity style={styles.btnAdd} onPress={handleAvatarBtn}>
                                {!avatar
                                    ? <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                                    : <AntDesign name="closecircleo" size={25} color="#BDBDBD"
                                        iconStyle={{borderColor: "black"}} />}
                            </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{name}</Text>

                    {posts && 
                        posts.map(({ id, title, comments, location, photo }) => (
                            <PostItem
                                key={id}
                                title={title}
                                comments={comments}
                                location={location}
                                url={photo}
                            />))
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
        paddingBottom: 40,
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: COLORS.mainBcg,
        marginTop: 147,
        minHeight: Dimensions.get("window").height - 147,
    },
    avatarWrap: {
        position: "absolute",
        top: -60,
        left: '50%',
        transform: [{ translateX: -50 }],
        width: 120,
        height: 120,
        backgroundColor: COLORS.secondaryBcg,
        borderRadius: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 16,
    },
    btnAdd: {
        width: 25,
        height: 25,
        overflow: "hidden",
        position: "absolute",
        left: "90%",
        top: "65%",
    },
    title: {
        fontFamily: "Roboto-Medium",
        color: COLORS.mainText,
        fontSize: 30,
        textAlign: "center",
    },
});