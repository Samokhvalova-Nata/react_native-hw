import { StyleSheet, View, Dimensions, Image} from "react-native";
import { COLORS } from "../../common/vars";


export default function CommentsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.postPhotoWrap}>
                <Image source={require('../../assets/images/black-sea.jpg')}
                    style={styles.postPhoto} />
            </View>
        </View>
        // TODO Add comments
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 45,
    backgroundColor: COLORS.mainBcg,
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: "rgba(0, 0, 0, 0.30)",
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
    minHeight: Dimensions.get("window").height - 150,
},
postPhotoWrap: {
    width: "100%",
    height: 240,
    backgroundColor: COLORS.secondaryBcg,
    borderRadius: 8,
},
postPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
},
});