import { StyleSheet,Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/vars";
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/uk";


export default function CommentItem({ commentId, comment, owner, createdAt }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <View style={{
                ...styles.commentContainer,
                // flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            }}>
            <Image source={require("../../assets/images/avatar.jpg")}
                alt="User photo"
                style={styles.avatar} />
            <View style={styles.commentWrap}>
                <Text style={styles.comment}>{comment}</Text>
                <Text style={styles.date}> {moment(createdAt).locale('uk').format('DD MMMM, YYYY | HH:mm')}</Text>
            </View>
        
        </View>
);
};

const styles = StyleSheet.create({
commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
},
avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
},
trashBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.mainBcg,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
    },
commentWrap: {
    position: 'relative',
    flex: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    // borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: 16,
    gap:8,
},
comment: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    color: COLORS.mainText,
    fontSize: 13,
},
date: {
    fontFamily: "Roboto-Regular",
    color: COLORS.secondaryText,
    fontSize: 10,
    position: 'absolute',
    bottom: 16,
    right: 16,
},
});
