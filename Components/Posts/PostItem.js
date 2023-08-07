import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/vars";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/post/postSlice";


export default function PostItem({ id, title, comments = 0, photoLocation, url, geoLocation }) {
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
        <TouchableOpacity
          style={styles.postComments}
          onPress={() => navigation.navigate("Comments")}
        >
          <Feather name="message-circle" size={24} style={styles.postIcon} />
          <Text style={styles.commentText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postLocation}
          onPress={() =>
            navigation.navigate("Map", { geoLocation, photoLocation })}
        >
          <Feather name="map-pin" size={24} style={styles.postIcon} />
          <Text style={styles.locationText}>{photoLocation}</Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  postComments: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  postLocation: {
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
  postIcon: {
    color: COLORS.secondaryText,
  },
});