import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { COLORS } from "../../common/vars";
import Background from '../../Components/Background/Background';
import MainButton from '../../Components/Buttons/MainButton';
import AuthLinkButton from "../../Components/Buttons/AuthLinkButton";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";
import Toast from "react-native-toast-message";
import { authStateChange } from "../../redux/auth/authSlice";

export default function LoginScreen() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false); 
    const [isShownPsw, setIsShownPsw] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const navigation = useNavigation();

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

    const handleLoginSubmit = () => {
        if (email && password) {
            dispatch(login(email, password)).then((data) => {
                if (!data) {
                    Toast.show({
                        type: "error",
                        text1: "Oooops! You have not been signin",
                    });
                    return;
                }
                // console.log('data', data);
                dispatch(authStateChange({ stateChange: true }));
                setEmail('');
                setPassword('');
                Toast.show({
                    type: "success",
                    text1: `Welcome, ${email} `,
                });
        });
        return;
        };

        Toast.show({
            type: "error",
            text1: "You have to fill out all fields",
        });
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
                            style={[styles.input, { borderColor: isFocused === "emailAddress" ? COLORS.accent : COLORS.borders }]}
                            placeholderTextColor={COLORS.secondaryText}
                            placeholder="Адреса електронної пошти"
                            value={email}
                            textContentType="emailAddress"
                            autoCompleteType="email"
                            onBlur={handleBlur}
                            onFocus={() => handleFocus("emailAddress")}
                            onChangeText={setEmail}
                        />

                        <View style={position= 'relative'}>
                            <TextInput
                            style={[styles.input, { marginBottom: 0 }, { borderColor: isFocused === "password" ? COLORS.accent : COLORS.borders }]}
                            placeholderTextColor={COLORS.secondaryText}
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
                                <MainButton
                                    text='Увійти'
                                    onPress={() => handleLoginSubmit(email, password)} />
                                <AuthLinkButton
                                    text='Немає акаунту?'
                                    linkText='Зареєструватися'
                                    onPress={() => navigation.navigate("Registration")}
                                />
                            </View>}
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
        backgroundColor: COLORS.mainBcg,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    formTitle: {
        fontFamily: 'Roboto-Medium',
        color: COLORS.mainText,
        marginBottom: 33,
        fontSize: 30,
        textAlign: "center",
    },
    input: {
        fontFamily: 'Roboto-Regular',
        height: 50,
        borderRadius: 8,
        backgroundColor: COLORS.secondaryBcg,
        borderWidth: 1,
        color: COLORS.mainText,
        padding: 16,
        marginBottom: 16,
    },
    btnShowPassword: {
        position: 'absolute',
        right: 16,
        top: 14,
    },
    btnShowPasswordText: {
        color: COLORS.linkText,
    },
});
