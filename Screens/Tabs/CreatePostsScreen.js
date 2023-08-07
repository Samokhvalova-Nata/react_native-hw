import React, { useEffect, useState } from "react";
import { ImageBackground, KeyboardAvoidingView } from "react-native";
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "./../../common/vars";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";


export default function CreatePostsScreen() {
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState('');
    const [geolocation, setGeoLocation] = useState('');

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const navigation = useNavigation();

    useEffect(() => {
        // camera permission
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();

        // location permission
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
            // TODO style to text
            return <Text>No access to camera</Text>;
        }

    const makePhoto = async () => {
        if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            setPhoto(uri);
        }
    };
    
    const sendPost = () => {
        navigation.navigate("PostsScreen", {photo})
    }

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
                            <Camera style={{ ...styles.postPhotoWrap }} 
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
                    <Text style={styles.text}>Завантажте фото</Text>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <TextInput
                            placeholder="Назва..."
                            placeholderTextColor={COLORS.secondaryText}
                            style={styles.input}
                            value={title}
                            onChangeText={value => setTitle(value)}
                        />
                        <View >
                            <Feather name="map-pin" size={24} color={COLORS.secondaryText} style={styles.locationIcon} />
                            <TextInput
                                placeholder="Місцевість..."
                                placeholderTextColor={COLORS.secondaryText}
                                style={{...styles.input,  marginBottom: 32, paddingLeft: 28, }}
                                // value={location}
                                onChangeText={value => setLocation(value)}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            ...styles.btn,
                            backgroundColor: photo && title && location ? COLORS.accent : COLORS.secondaryBcg,
                        }}
                        onPress={sendPost}>
                        <Text title="Login" style={{
                            ...styles.btnTitle,
                            color: photo && title && location ? COLORS.mainBcg : COLORS.secondaryText,
                        }}
                        >Опубліковати
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.trashBtn} onPress={() => { }}>
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
        // borderColor: COLORS.borders,
        // borderStyle: 'solid',
        // borderWidth: 1,
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