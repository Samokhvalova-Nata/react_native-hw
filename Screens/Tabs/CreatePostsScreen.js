import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard,  TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { COLORS } from "./../../common/vars";


export default function CreatePostsScreen() {
    const [title, setTitle] = useState('');
    // const [photo, setPhoto] = useState('');
    const [location, setLocation] = useState('');

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.postPhotoWrap}>
                        <TouchableOpacity style={styles.cameraBtn} onPress={() => { }}>
                            <Ionicons name="ios-camera" size={24} color={COLORS.secondaryText} />
                        </TouchableOpacity>
                    </View>
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
                                value={location}
                                onChangeText={value => setLocation(value)}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            ...styles.btn,
                            backgroundColor: title && location ? COLORS.accent : COLORS.secondaryBcg,
                        }}
                        onPress={() => { }}>
                        <Text title="Login" style={{
                            ...styles.btnTitle,
                            color: title && location ? COLORS.mainBcg : COLORS.secondaryText,
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
        width: '100%',
        height: 240,
        backgroundColor: COLORS.secondaryBcg,
        borderRadius: 8,
        justifyContent: "center",
		alignItems: "center",
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