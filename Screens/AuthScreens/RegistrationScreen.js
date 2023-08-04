import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import { COLORS } from "../../common/vars";
import Background from "../../Components/Background/Background";  
import Avatar from "../../Components/Avatar/Avatar";
import MainButton from "../../Components/Buttons/MainButton";
import AuthLinkButton from "../../Components/Buttons/AuthLinkButton";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isShownPsw, setIsShownPsw] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
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
    setIsFocused("");
  };

  const handleShowPassword = () => {
    setIsShownPsw(!isShownPsw);
  };

  const handleRegisterSubmit = (name, email, password) => {
    if (name !== "" && email !== "" && password !== "") {
      console.info(
        `User "${name}" with email "${email}" and password "${password}" has been registred`
      );
      navigation.navigate("Home", {
        screen: "PostsScreen",
        params: { user: name, mail: email },
      });
    }
  };

  return (
    <>
      <Background />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <Avatar />
            <Text style={styles.formTitle}>Реєстрація</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    isFocused === "username" ? COLORS.accent : COLORS.borders,
                },
              ]}
              placeholderTextColor={COLORS.secondaryText}
              placeholder="Логін"
              value={name}
              textContentType="username"
              autoCompleteType="off"
              onBlur={handleBlur}
              onFocus={() => handleFocus("username")}
              onChangeText={setName}
            />

            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    isFocused === "emailAddress"
                      ? COLORS.accent
                      : COLORS.borders,
                },
              ]}
              placeholderTextColor={COLORS.secondaryText}
              placeholder="Адреса електронної пошти"
              value={email}
              textContentType="emailAddress"
              autoCompleteType="off"
              onBlur={handleBlur}
              onFocus={() => handleFocus("emailAddress")}
              onChangeText={setEmail}
            />

            <View style={(position = "relative")}>
              <TextInput
                style={[
                  styles.input,
                  { marginBottom: 0 },
                  {
                    borderColor:
                      isFocused === "password" ? COLORS.accent : COLORS.borders,
                  },
                ]}
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
                onPress={handleShowPassword}
              >
                <Text style={styles.btnShowPasswordText}>
                  {isShownPsw ? "Приховати" : "Показати"}
                </Text>
              </TouchableOpacity>
            </View>

            {!keyboardStatus && (
              <View>
                <MainButton
                  text="Зареєстуватися"
                  onPress={() => handleRegisterSubmit(name, email, password)}
                />
                <AuthLinkButton
                  text="Вже є акаунт?"
                  linkText="Увійти"
                  onPress={() => navigation.navigate("Login")}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    paddingTop: 92,
    paddingBottom: 40,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: COLORS.mainBcg,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  formTitle: {
    fontFamily: "Roboto-Medium",
    color: COLORS.mainText,
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.secondaryBcg,
    borderWidth: 1,
    color: COLORS.mainText,
    padding: 16,
    marginBottom: 16,
  },
  btnShowPassword: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  btnShowPasswordText: {
    color: COLORS.linkText,
  },
});