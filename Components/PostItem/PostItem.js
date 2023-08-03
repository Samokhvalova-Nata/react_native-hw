import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/vars";
// import photo from "../assets/images/forest.jpg"
import { useNavigation, useRoute } from "@react-navigation/native";

function PostItem({ title, comments, location, url }) {
  const navigation = useNavigation();
  const photourl = url;

  return (
    <View style={styles.postContainer}>
      <View style={styles.postPhotoWrap}>
        <Image source={{ uri: url }} style={styles.postPhoto} alt={title} />
      </View>
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postDetails}>
        <View style={styles.postComments}>
          <Feather
            name="message-circle"
            size={24}
            style={styles.postIcon}
            onPress={() => navigation.navigate("Comments")}
          />
          <Text style={styles.commentText}>{comments}</Text>
        </View>
        <View style={styles.postLocation}>
          <Feather name="map-pin" size={24} style={styles.postIcon} />
          <Text
            style={styles.locationText}
            onPress={() => navigation.navigate("Map")}
          >
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
}

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
    // height: 240,
    borderRadius: 8,
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
    // gap: 4,
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

export default PostItem;
