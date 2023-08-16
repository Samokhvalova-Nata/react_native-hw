import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../common/vars";
import { getUserAvatar, getUserId, getUserName } from "../../redux/auth/authSelectors";
import { logout, updateUserAvatar } from "../../redux/auth/authOperations";
import Background from "../../Components/Background/Background";
import PostProfileItem from "../../Components/Posts/PostProfileItem";
import Avatar from "../../Components/Avatar/Avatar";
import MainButton from "../../Components/Buttons/MainButton";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



export default function ProfileScreen() {
    const navigation = useNavigation();
    const name = useSelector(getUserName);
    const userId = useSelector(getUserId);
    const avatarSever = useSelector(getUserAvatar);

    const [newAvatar, setNewAvatar] = useState("");
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [openCamera, setOpenCamera] = useState(false);

    const dispatch = useDispatch();
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const dbRef = collection(db, "posts");
        const userQuery = query(dbRef, where("owner.userId", "==", userId));
        onSnapshot(userQuery, (data) => {
            const dbPosts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUserPosts(dbPosts);
        })
    }, []);

    const uploadPhotoToServer = async () => {
        const uniqPostId = Date.now().toString();
        try {
            const response = await fetch(newAvatar);
            const file = await response.blob();
            const imageRef = ref(storage, `avatarImage/${uniqPostId}`);
            await uploadBytes(imageRef, file);
            const processedPhoto = await getDownloadURL(imageRef);
            return processedPhoto;
        } catch (error) {
            console.log("error", error.message);
            Toast.show({
                type: "error",
                text1: "Sending photo to server was rejected",
            });
        }
    };

    const makePhoto = async () => {
        if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            setNewAvatar(uri);
            setOpenCamera(false);

            const newServerAvatar = await uploadPhotoToServer();

            dispatch(updateUserAvatar(newServerAvatar)).then((data) => {
                // console.log('data', data);
            if (data === undefined || !data.uid) {
                Toast.show({
                    type: "error",
                    text1: "Упс! Аватар не замінено",
                });
            return;
                }
                
            Toast.show({
                type: "success",
                text1: "Аватар замінено успішно",
            });
            });
        }
    };

    console.log('avatarSever', avatarSever);
    

    return (
      <>
        <Background />
        <ScrollView>
          <View style={styles.container}>
            <Feather
              name="log-out"
              size={24}
              color={COLORS.secondaryText}
              style={{ position: "absolute", top: 22, right: 16 }}
              onPress={() => dispatch(logout())}
            />

            <View style={styles.avatarWrap}>
              {openCamera ? (
                <Camera
                  style={styles.avatar}
                  type={type}
                  ref={setCameraRef}
                  ratio="1:1"
                >
                  <TouchableOpacity
                    style={{ ...styles.cameraBtn }}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.front
                          ? Camera.Constants.Type.back
                          : Camera.Constants.Type.front
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camera-flip"
                      size={22}
                      color={COLORS.secondaryText}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ ...styles.cameraBtnPos, ...styles.cameraBtn }}
                    onPress={makePhoto}
                  >
                    <Ionicons
                      name="ios-camera"
                      size={24}
                      color={COLORS.secondaryText}
                    />
                  </TouchableOpacity>
                </Camera>
              ) : (
                <Image
                  source={{ uri: newAvatar? newAvatar : avatarSever }}
                  style={styles.avatar}
                  alt="User photo"
                />
              )}

              <TouchableOpacity style={styles.btnAdd}>
                {!newAvatar ? (
                  <AntDesign
                    name="pluscircleo"
                    size={25}
                    color={COLORS.accent}
                    onPress={() => {
                      setNewAvatar(null);
                      setOpenCamera(true);
                    }}
                  />
                ) : (
                  <AntDesign
                    name="closecircleo"
                    size={25}
                    color={COLORS.secondaryText}
                    onPress={() => {
                      setOpenCamera(true);
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>{name}</Text>

            {userPosts.length !== 0 ? (
              userPosts.map(
                ({
                  id,
                  title,
                  photoLocation,
                  photo,
                  geoLocation,
                  comments,
                  likes,
                }) => (
                  <PostProfileItem
                    key={id}
                    id={id}
                    title={title}
                    photoLocation={photoLocation}
                    url={photo}
                    geoLocation={geoLocation}
                    comments={comments}
                    likes={likes}
                  />
                )
              )
            ) : (
              <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 16 }}>
                <Text style={styles.text}>Ще немає публікацій</Text>
                <MainButton
                  text="Створити публікацію"
                  onPress={() => navigation.navigate("CreatePostsScreen")}
                />
              </View>
            )}
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
  avatarWrap: {
    position: "absolute",
    top: -60,
    left: "50%",
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
  cameraBtnPos: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  cameraBtn: {
    width: 35,
    height: 35,
    backgroundColor: COLORS.mainBcg,
    opacity: 0.8,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAdd: {
    position: "absolute",
    top: 75,
    right: -12,
    width: 25,
    height: 25,
    backgroundColor: COLORS.mainBcg,
    borderRadius: 50,
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
    textAlign: "center",
  },
});