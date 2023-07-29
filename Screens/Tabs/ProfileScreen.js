import React from "react";
import { StyleSheet, Text, View, } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>Профіль</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto-Medium',
        color: "#212121",
        marginBottom: 33,
        fontSize: 30,
        textAlign: "center",
    },
});