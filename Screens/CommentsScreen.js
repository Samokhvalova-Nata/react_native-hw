import { StyleSheet, View, Text} from 'react-native';

export default function CommentsScreen() {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>Коментарі</Text>
    </View>
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