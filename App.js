import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {
  StyleSheet,
  Text, View, ImageBackground, TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView, Platform, Alert  } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  return (
      <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/image-bg.jpg")}
      >

        {/* <ImageBackground style={styles.formImage} source={require("./assets/images/bg-white.jpg")}> */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <KeyboardAvoidingView behavior={Platform.OS ==="ios" ? "padding" : "heigth"} >
              <Text style={styles.formTitle}>Реєстрація</Text>
              <TextInput style={styles.input} 
                value={name}
                onChangeText={setName}
                placeholder="Логін"/>
              <TextInput style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Адреса електронної пошти"
              />
              <TextInput style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholder="Пароль"
              />
          
          <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
            <Text title="Login" style={styles.btnTitle} onPress={onLogin}>Зареєстуватися</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Вже є акаунт? Увійти</Text>
            </KeyboardAvoidingView>
        </View>
        </TouchableWithoutFeedback>
        {/* </ImageBackground> */}
        
        
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
    marginBottom: 16,
    padding: 16,
    placeholderTextColor: '#BDBDBD',
    textAlign: "left",
  },
  form: {
    marginHorizontal: 16,
  },
  formTitle: {
    color: "#212121",
    marginBottom: 33,
    marginBottom: 33,
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
  },
  btn: {
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  text: {
    marginTop: 16,
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});
