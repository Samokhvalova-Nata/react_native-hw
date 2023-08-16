import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { COLORS } from "../../common/vars";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { getUserAvatar, getUserId, getUserName } from "../../redux/auth/authSelectors";

export default function Avatar() {
    // const [avatar, setAvatar] = useState(false);
    const name = useSelector(getUserName);
    const userId = useSelector(getUserId);
    const avatarSever = useSelector(getUserAvatar);

    const [avatar, setAvatar] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [openCamera, setOpenCamera] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
            return <View />;
    }
    if (hasPermission === false) {
            return <Text>No access to camera</Text>;
    }
console.log('avatarSever', avatarSever)
    const makePhoto = async () => {
        if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            setAvatar(uri);
            console.log('avatar', avatar)
            setOpenCamera(false);
        }
    };

    const uploadPostToServer = async () => {
        try {
            const avatar = await uploadPhotoToServer();
            const docRef = await addDoc(collection(db, "avatars"), {
                avatar,
                owner: { userId, name }
            });
            console.log('Document written with ID: ', docRef.id);
            // dispatch(updateAvatar(avatar));
        } catch (e) {
            console.error("Error adding document: ", e);
            throw e;
        }
    };


    return (
        <View style={styles.avatarWrap}>
            {openCamera ?
                    (
                    <Camera style={styles.avatar} 
                        type={type}
                        ref={setCameraRef}
                        ratio="1:1">
                        <MaterialCommunityIcons name="camera-flip" size={22} color={COLORS.secondaryText}
                            style={styles.flipContainer}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                                );}}
                        />
                        <TouchableOpacity style={styles.cameraBtn} onPress={makePhoto}>
                            <Ionicons name="ios-camera" size={24} color={COLORS.secondaryText}/>
                        </TouchableOpacity>
                    </Camera> 
                    ) : (
                    <Image source={{uri: avatarSever ? avatarSever : null}} style={styles.avatar} alt="User photo"/>
                    )
            }


            <TouchableOpacity style={styles.btnAdd} >
                {!avatar
                    ? <AntDesign name="pluscircleo" size={25} color={COLORS.accent}
                    onPress={() => {
                        setAvatar(null);
                        setOpenCamera(true);
                    }}/>
                    : <AntDesign name="closecircleo" size={25} color={COLORS.secondaryText}
                        onPress={() => { setOpenCamera(true) }}
                    />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
        position: "absolute",
        top: 75,
        right: -12,
        width: 25,
        height: 25,
        backgroundColor: COLORS.mainBcg,
        borderRadius: 50,
    },
});

            // {
            //   avatar && (
            //     <Image
            //       source={require("../../assets/images/avatar.jpg")}
            //       alt="User photo"
            //       style={styles.avatar}
            //     />
            //   );
            // }