import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { COLORS } from "../../common/vars";
import { db } from "../../firebase/config";
import { getUserAvatar, getUserEmail, getUserName } from "../../redux/auth/authSelectors";
import PostItem from "../../Components/Posts/PostItem";


export default function PostsScreen() {
    const name = useSelector(getUserName);
    const email = useSelector(getUserEmail);
    const avatar = useSelector(getUserAvatar);
    const [serverPosts, setServerPosts] = useState([]);

    useEffect(() => {
        const dbRef = collection(db, "posts");
        onSnapshot(dbRef, (data) => {
            const dbPosts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            const sortedDbPosts = dbPosts.sort((a, b) => a.createdAt - b.createdAt);
            setServerPosts(sortedDbPosts);
        })
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.userInfo}>
                    <Image style={styles.avatar}
                        source={{uri: avatar}}
                    alt="User photo" />
                <View style={styles.userData}>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </View>
            {(serverPosts.length !== 0) && 
                serverPosts.map(({ id, title, photoLocation, photo, geoLocation }) => (
                    <PostItem
                        key={id}
                        id={id}
                        title={title}
                        photoLocation={photoLocation}
                        url={photo}
                        geoLocation={geoLocation}
                    />))
            }
        </View>
    </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 45,
        backgroundColor: COLORS.mainBcg,
        borderTopWidth: 0.5,
        borderBottomWidth: -0.5,
        borderTopColor: 'rgba(0, 0, 0, 0.30)',
        borderBottomColor: 'rgba(0, 0, 0, 0.30)',
        minHeight: Dimensions.get("window").height - 150,
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.secondaryBcg,
        borderRadius: 16,
    },
    userData: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    userName: {
        fontFamily: 'Roboto-Bold',
        color: COLORS.mainText,
        fontSize: 13,
    },
    userEmail: {
        fontFamily: 'Roboto-Regular',
        color: COLORS.mainText,
        fontSize: 11,
    },
    postPhoto: {
        width: "100%",
        height: 240,
        borderRadius: 8,
    },
});