import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { COLORS } from "./../../common/vars";
import { db, storage } from "../../firebase/config";
import { getUserId, getUserName } from "../../redux/auth/authSelectors";


export default function CreatePostsScreen() {
    const navigation = useNavigation();
    const name = useSelector(getUserName);
    const userId = useSelector(getUserId);

    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [photoLocation, setPhotoLocation] = useState("");
    const [geoLocation, setGeoLocation] = useState('');

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isFocused, setIsFocused] = useState(null); 

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }

            let location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setGeoLocation(coords);
        })();
        }, []);

        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }

    const makePhoto = async () => {
        if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            setPhoto(uri);
        }
    };

    const removePost = () => {
        setPhoto('');
        setTitle('');
        setPhotoLocation('');
    };

    const uploadPostToServer = async () => {
        try {
            const photo = await uploadPhotoToServer();
            const docRef = await addDoc(collection(db, "posts"), {
                photo,
                title,
                photoLocation,
                geoLocation,
                owner: { userId, name },
                createdAt: new Date().getTime(),
            });
            console.log('Document written with ID: ', docRef.id);
            Toast.show({
                type: "success",
                text1: "Збережено",
            });
        } catch (e) {
            console.error("Error adding document: ", e);
            Toast.show({
                type: "error",
                text1: "Упс! Пост не зберігся",
            });
            throw e;
        } finally {
            removePost();
            navigation.navigate("PostsScreen");
        }
    };

    const uploadPhotoToServer = async () => {
        const uniqPostId = Date.now().toString();
        try {
            const response = await fetch(photo);
            const file = await response.blob();
            const imageRef = ref(storage, `postImage/${uniqPostId}`);
            await uploadBytes(imageRef, file);

            const processedPhoto = await getDownloadURL(imageRef);
            return processedPhoto;
        } catch (error) {
            console.log('error', error.message)
        }
    };    

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {photo ? (
                    <ImageBackground source={{uri: photo}} style={styles.postPhotoWrap}>
                            <TouchableOpacity style={{ ...styles.cameraBtn, opacity: 0.4 }} onPress={() => {
                                setPhoto('');
                            }}>
                                <Ionicons name="ios-camera" size={24} color={COLORS.mainBcg}/>
                        </TouchableOpacity>
                    </ImageBackground>
                    ) : (
                    <Camera style={styles.postPhotoWrap} 
                            type={type}
                            ref={setCameraRef}>
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
                    )}

                    {photo
                        ? <Text style={styles.text}>Редагувати фото</Text>
                        : <Text style={styles.text}>Завантажте фото</Text>}

                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <TextInput
                            name='title'
                            placeholder="Назва..."
                            placeholderTextColor={COLORS.secondaryText}
                            style={
                                isFocused === 'title'
                                    ? { ...styles.input, borderColor: COLORS.accent }
                                    : { ...styles.input }}
                            value={title}
                            onChangeText={value => setTitle(value)}
                            onFocus={() => setIsFocused('title')}
                            onBlur={() => setIsFocused(null)}
                        />
                        <View >
                            <Feather name="map-pin" size={24} color={COLORS.secondaryText} style={styles.locationIcon} />
                            <TextInput
                                name='location'
                                placeholder="Місцевість..."
                                placeholderTextColor={COLORS.secondaryText}
                                style={
                                    isFocused === 'location'
                                        ? { ...styles.input, marginBottom: 32, paddingLeft: 28, borderColor: COLORS.accent }
                                        : { ...styles.input, marginBottom: 32, paddingLeft: 28}}
                                value={photoLocation}
                                onChangeText={value => setPhotoLocation(value)}
                                onFocus={() => setIsFocused('location')}
                                onBlur={() => setIsFocused(null)}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={ (photo && title && photoLocation) ? false : true }
                        style={{
                            ...styles.btn,
                            backgroundColor: photo && title && photoLocation ? COLORS.accent : COLORS.secondaryBcg,
                        }}
                        onPress={uploadPostToServer}>
                        <Text title="Login" style={{
                            ...styles.btnTitle,
                            color: photo && title && photoLocation ? COLORS.mainBcg : COLORS.secondaryText,
                        }}
                        >Опубліковати
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.trashBtn} onPress={removePost}>
                        <Feather name="trash-2" size={24} color={COLORS.secondaryText} />
                    </TouchableOpacity>
                </View >
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 32,
        backgroundColor: COLORS.mainBcg,
        borderTopWidth: 0.5,
        borderBottomWidth: -0.5,
        borderTopColor: 'rgba(0, 0, 0, 0.30)',
        borderBottomColor: 'rgba(0, 0, 0, 0.30)',
    },
    postPhotoWrap: {
        flex: 1,
        height: 240,
        overflow: 'hidden',
        backgroundColor: COLORS.secondaryBcg,
        borderColor: COLORS.borders,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
		alignItems: "center",
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    flipContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    cameraBtn: {
		width: 60,
		height: 60,
        backgroundColor: COLORS.mainBcg,
        borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
    text: {
        marginTop: 8,
        marginBottom: 32,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		color: COLORS.secondaryText,
    },
    input: {
        height: 50,
        width: "100%",
        marginBottom: 16,
        borderBottomWidth: 1,
        paddingBottom: 11,
        borderColor: COLORS.borders,
        color: COLORS.mainText,
        fontSize: 16,
    },
    locationIcon: {
        position: 'absolute',
        top: 10,
        left: 0,
    },
    btn: {
        height: 51,
        borderRadius: 100,
        alignItems: "center",
        paddingVertical: 16,
    },
    btnTitle: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
    },
    trashBtn: {
        width: 70,
        borderRadius: 20,
        backgroundColor: COLORS.secondaryBcg,
        paddingHorizontal: 23,
        paddingVertical: 8,
        marginTop: 120,
        marginBottom: 22,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});