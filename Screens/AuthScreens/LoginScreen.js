import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { COLORS } from "../../common/vars";
import { login } from "../../redux/auth/authOperations";
import { authStateChange } from "../../redux/auth/authSlice";
import Background from '../../Components/Background/Background';
import MainButton from '../../Components/Buttons/MainButton';
import AuthLinkButton from "../../Components/Buttons/AuthLinkButton";


export default function LoginScreen() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false); 
    const [isShownPsw, setIsShownPsw] = useState(true);  
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

    const handleLoginSubmit = () => {
        if (email && password) {
            dispatch(login(email, password)).then((data) => {
                if (data === undefined || !data.user) {
                    Toast.show({
                        type: "error",
                        text1: "Упс! Вхід не виконано",
                    });
                    return;
                }
                dispatch(authStateChange({ stateChange: true }));
                setEmail('');
                setPassword('');
                Toast.show({
                    type: "success",
                    text1: `Привіт, ${email} `,
                });
        });
        return;
        };

        Toast.show({
            type: "error",
            text1: "Всі поля мають бути заповнені",
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
                            secureTextEntry={isShownPsw}
                            onBlur={handleBlur}
                            onFocus={() => handleFocus("password")}
                            onChangeText={setPassword}
                        />
                        {password && (
                            <TouchableOpacity
                            style={styles.btnShowPassword}
                            onPress={() => setIsShownPsw(!isShownPsw)}
                            >
                            <Text style={styles.btnShowPasswordText}>
                                {isShownPsw ? "Показати" : "Приховати"}
                            </Text>
                            </TouchableOpacity>
                        )}
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
