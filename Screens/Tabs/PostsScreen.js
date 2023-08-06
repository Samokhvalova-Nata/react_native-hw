import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { useSelector } from "react-redux";
import { COLORS } from "../../common/vars";
import { getPosts } from "../../redux/post/postSelectors";
import { getUserEmail, getUserName } from "../../redux/auth/authSelectors";
import PostItem from "../../Components/Posts/PostItem";


export default function PostsScreen({route}) {
    const posts = useSelector(getPosts);
    const name = useSelector(getUserName);
    const email = useSelector(getUserEmail);
    // const avatar = useSelector(getUserAvatar);
    console.log('route.params', route.params)
    
    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image style={styles.avatar}
                    source={require("../../assets/images/avatar.jpg")}
                    alt="User photo" />
                <View style={styles.userData}>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </View>
            {(posts.length !== 0) && 
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
});