import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text, View,  
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView, Platform, TextInput
} from 'react-native';
import Background from '../Components/Background/Background';

export default function LoginScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false); 
    const [isShownPsw, setIsShownPsw] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
    });
    return () => {
        showSubscription.remove();
        hideSubscription.remove();
    };
    }, []);

    const handleFocus = (key) => {
        setIsFocused(key);
    };

    const handleBlur = () => {
        setIsFocused('');
    };

    const handleShowPassword = () => {
        setIsShownPsw(!isShownPsw);
    };

    const handleLoginSubmit = (email, password) => {
        if (email !== '' && password !== '') {
            console.info(
            `User with email "${email}" and password "${password}" has been logged in`);
        };
    };

    return (
        <>
        <Background />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.container}
                    behavior={Platform.OS == "ios" ? "padding" : "height"}>

                    <View style={styles.form}>

                        <Text style={styles.formTitle}>Увійти</Text>

                        <TextInput
                            style={[styles.input, { borderColor: isFocused === "emailAddress" ? "#FF6C00" : "#E8E8E8" }]}
                            placeholderTextColor={'#BDBDBD'}
                            placeholder="Адреса електронної пошти"
                            value={email}
                            textContentType="emailAddress"
                            autoCompleteType="off"
                            onBlur={handleBlur}
                            onFocus={() => handleFocus("emailAddress")}
                            onChangeText={setEmail}
                        />

                        <View style={position= 'relative'}>
                            <TextInput
                            style={[styles.input, { marginBottom: 0 }, { borderColor: isFocused === "password" ? "#FF6C00" : "#E8E8E8" }]}
                            placeholderTextColor={'#BDBDBD'}
                            placeholder="Пароль"
                            value={password}
                            textContentType="password"
                            autoCompleteType="off"
                            secureTextEntry
                            onBlur={handleBlur}
                            onFocus={() => handleFocus("password")}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                                style={styles.btnShowPassword}
                                onPress={handleShowPassword}>
                                <Text style={styles.btnShowPasswordText}>
                                    {isShownPsw ? "Приховати" : "Показати"}
                                </Text>    
                            </TouchableOpacity>
                        </View>

                        {!keyboardStatus &&
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.btnSubmit}
                                    onPress={() => handleLoginSubmit( email, password)}>
                                    <Text title="Login" style={styles.btnSubmitTitle} >Увійти
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
                                    <Text style={styles.text}>Немає акаунту?</Text>
                                    <Text style={[styles.text, { textDecorationLine: 'underline' }]}
                                        onPress={() => console.log("Redirect to Registration")}>
                                        Зареєструватися
                                    </Text>
                                </View>
                            </View>}
                        <StatusBar style="auto" />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    form: {
        position: 'relative',
        paddingTop: 32,
        paddingBottom: 40,
        paddingHorizontal: 16,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    formTitle: {
        fontFamily: 'Roboto-Medium',
        color: "#212121",
        marginBottom: 33,
        fontSize: 30,
        textAlign: "center",
    },
    input: {
        fontFamily: 'Roboto-Regular',
        height: 50,
        borderRadius: 8,
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        color: "#212121",
        padding: 16,
        marginBottom: 16,
    },
    btnShowPassword: {
        position: 'absolute',
        right: 16,
        top: 14,
    },
    btnShowPasswordText: {
        color: '#1B4371',
    },
    btnSubmit: {
        height: 51,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginTop: 43,
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 16,
    },
    btnSubmitTitle: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    text: {
        marginTop: 16,
        color: "#1B4371",
        textAlign: "center",
    },
});
