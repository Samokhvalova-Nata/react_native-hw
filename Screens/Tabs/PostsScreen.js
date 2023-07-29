import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList , ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../common/vars";
import PostItem from "../../Components/PostItem";
import { useSelector } from "react-redux";
import { getPosts } from "../../redux/post/postSelectors";
import { getUserAvatar, getUserEmail, getUserName } from "../../redux/auth/authSelectors";


export default function PostsScreen({ route }) {
    const posts = useSelector(getPosts);
    const name = useSelector(getUserName);
    const email = useSelector(getUserEmail);
    //TODO const avatar = useSelector(getUserAvatar);

console.log('posts', posts)
    // const [name, setName] = useState('Natali Romanova');
    // const [email, setEmail] = useState('email@example.com');

    // useEffect(()=>{
    //     if (route.params) {
    //         setName(route.params.user);
    //         setEmail(route.params.mail);
    //         setPosts((prevState) => [...prevState, route.params.posts])
    //     }
    // }, [route.params]);


    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image style={styles.avatar} source={require( "../../assets/images/avatar.jpg") } alt="User photo"/>
                <View style={styles.userData}>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </View>
            {posts && 
                posts.map(({
                id, title, comments, location, photo,
                }) => (
                    <PostItem
                        key={id}
                        title={title}
                        comments={comments}
                        location={location}
                        url={photo}
                    />
                )
                )}
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        // alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 32,
        backgroundColor: COLORS.mainBcg,
        borderTopWidth: 0.5,
        borderBottomWidth: -0.5,
        borderTopColor: 'rgba(0, 0, 0, 0.30)',
        borderBottomColor: 'rgba(0, 0, 0, 0.30)',
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
});