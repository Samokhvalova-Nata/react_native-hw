import React from "react";
import { StyleSheet, Text, View, } from 'react-native';

export default function CreatePostsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>Створити публікацію</Text>
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