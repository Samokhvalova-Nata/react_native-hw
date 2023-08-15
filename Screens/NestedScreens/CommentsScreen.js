import { StyleSheet, View, Dimensions, Image, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/vars";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase/config";
import { collection, addDoc, setDoc, Timestamp, onSnapshot } from "firebase/firestore";
import { getUserId, getUserName } from "../../redux/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/post/postSlice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Keyboard } from "react-native";


export default function CommentsScreen({ route }) {
    const { id, url } = route.params;
    const [comment, setComment] = useState(""); 
    const [allComment, setAllComment] = useState([]); 
    const [isFocused, setIsFocused] = useState(false);
    const name = useSelector(getUserName);
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();

    const sendComment = async () => {
        if (!comment) {
            Toast.show({
                type: "error",
                text1: "Введіть коментар",
            });
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "posts", id, "comments"), {
            comment,
            owner: { userId, name },
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date()),
            });
            dispatch(addComment(comment));
            Toast.show({
                type: "success",
                text1: "Збережено",
            });
        } catch (e) {
            console.error("sendComment: ", e);
            throw e;
        }
        finally {
            setComment("");
        }
    };

    useEffect(() => {
        const commentsRef = collection(db, "posts", id, "comments");
        onSnapshot(commentsRef, (data) => {
            const dbComments = data.docs.map((doc) => ({ id: doc.id,...doc.data() }));
            setAllComment(dbComments);
        })
    }, []);

    console.log('allComment', allComment);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.postPhotoWrap}>
                    <Image source={{ uri: url ? url : null }}
                    style={styles.postPhoto} />
                </View>
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.inputWrap}>
                    <TextInput
                        name="comment"
                        value={comment}
                        placeholder="Коментувати..."
                        placeholderTextColor={COLORS.secondaryText}
                        style={
                            isFocused
                            ? { ...styles.input, borderColor: COLORS.accent }
                            : { ...styles.input}}
                            onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={value => setComment(value)}
                    />
                    <View style={styles.sendBtn} >
                        <Feather onPress={sendComment} name="arrow-up" size={24} color={COLORS.mainBcg}/>
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        </View>
        
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 32,
    // paddingBottom: 45,
    backgroundColor: COLORS.mainBcg,
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: "rgba(0, 0, 0, 0.30)",
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
    minHeight: Dimensions.get("window").height - 150,
},
postPhotoWrap: {
    width: "100%",
    height: 240,
    backgroundColor: COLORS.secondaryBcg,
    borderRadius: 8,
},
postPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    },
    inputWrap: {
    marginTop: 31,
    marginBottom: 16,
},
input: {
    height: 50,
    // justifyContent: 'flex-end',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: COLORS.secondaryBcg,
    borderColor: COLORS.borders,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 15,
    },
sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    backgroundColor: COLORS.accent,
    borderRadius: 100,
    position: "absolute",
    top: 8,
    right: 8,
    },
});