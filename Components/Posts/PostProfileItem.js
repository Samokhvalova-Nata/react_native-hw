import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/vars";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/post/postSlice";


export default function PostProfileItem({id, title, comments=0, likes=0, photoLocation, url }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.postContainer}>
      <View style={styles.postPhotoWrap}>
        <ImageBackground
          source={{ uri: url }}
          style={styles.postPhoto}
          alt={title}
        >
          <TouchableOpacity
            style={styles.trashBtn}
            onPress={() => dispatch(deletePost(id))}
          >
            <Feather name="trash-2" size={20} color={COLORS.accent} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postDetails}>
        <View style={styles.postData}>
          <FontAwesome
            name={comments === 0 ? "comment-o" : "comment"}
            size={24}
            color={comments === 0 ? COLORS.secondaryText : COLORS.accent}
            onPress={() => navigation.navigate("Comments")}
          />
          <Text style={styles.commentText}>{comments}</Text>
        </View>
        <View style={{ ...styles.postData, marginLeft: 24 }}>
          <Feather
            name="thumbs-up"
            size={24}
            color={likes === 0 ? COLORS.secondaryText : COLORS.accent}
            onPress={() => navigation.navigate("Comments")}
          />
          <Text style={styles.commentText}>{likes}</Text>
        </View>
        <View style={styles.postLocation}>
          <Feather name="map-pin" size={24} color={COLORS.secondaryText} />
          <Text
            style={styles.locationText}
            onPress={() => navigation.navigate("Map")}
          >
            {photoLocation}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 32,
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
  trashBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.mainBcg,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  postTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    color: COLORS.mainText,
    fontSize: 16,
  },
  postDetails: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  postData: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  postLocation: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    color: COLORS.secondaryText,
    fontSize: 16,
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    color: COLORS.mainText,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
