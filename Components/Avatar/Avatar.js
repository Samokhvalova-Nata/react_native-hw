import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { COLORS } from "../../common/vars";

export default function Avatar() {
    const [avatar, setAvatar] = useState(true);

    const handleAvatarBtn = () => {
        setAvatar(!avatar);
    };

    return (
        <View style={styles.avatarWrap}>
            {avatar &&
                <Image source={require("../../assets/images/avatar.jpg")}
                    alt="User photo"
                    style={styles.avatar} />}
            <TouchableOpacity style={styles.btnAdd} onPress={handleAvatarBtn}>
                {!avatar
                    ? <AntDesign name="pluscircleo" size={25} color={COLORS.accent} />
                    : <AntDesign name="closecircleo" size={25} color={COLORS.secondaryText} />}
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