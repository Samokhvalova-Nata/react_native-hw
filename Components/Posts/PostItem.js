import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/vars";


export default function PostItem({ id, title, comments = 0, photoLocation, url, geoLocation }) {
  const navigation = useNavigation();

  return (
    <View style={styles.postContainer}>
      <View style={styles.postPhotoWrap}>
        <ImageBackground
          source={{ uri: url }}
          style={styles.postPhoto}
          alt={title}
        />
      </View>
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postDetails}>
        <TouchableOpacity
          style={styles.postComments}
          onPress={() => navigation.navigate("Comments", { url, id })}
        >
          <Feather name="message-circle" size={24} style={styles.postIcon} />
          <Text style={styles.commentText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postLocation}
          onPress={() =>
            navigation.navigate("Map", { geoLocation, photoLocation })
          }
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