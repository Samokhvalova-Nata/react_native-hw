import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { COLORS } from "../../common/vars";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { deleteLike, deletePost, sendLike } from "../../redux/post/postOperations";
import { getUserAvatar, getUserId, getUserName } from "../../redux/auth/authSelectors";


export default function PostProfileItem({id, title, photoLocation, url, geoLocation }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const name = useSelector(getUserName);
  const userId = useSelector(getUserId);
  const avatar = useSelector(getUserAvatar);

  const [allComments, setAllComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [userPutLike, setUserPutLike] = useState(false);

  useEffect(() => {
    const commentsRef = collection(db, "posts", id, "comments");
    onSnapshot(commentsRef, (data) => {
      const dbComments = data.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      setAllComments(dbComments);
    });
  }, []);

  useEffect(() => {
    const likesRef = collection(db, "posts", id, "likes");
    onSnapshot(likesRef, (data) => {
      const dbLikes = data.docs.map((doc) => ({
        likeId: doc.id,
        ...doc.data(),
      }));
      const didUserPutLike = dbLikes.some(dbLike => dbLike.likeId === userId);
      setUserPutLike(didUserPutLike)
      setAllLikes(dbLikes);
    });
  }, []);
  
  const handleLikes = async () => {
    if (!userPutLike) {
        await sendLike(id, userId, name, avatar);
      return;
    }
    await deleteLike(id, userId);
  };

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
          style={styles.postData}
          onPress={() => navigation.navigate("Comments", { url, id })}
        >
          <FontAwesome
            name={allComments.length === 0 ? "comment-o" : "comment"}
            size={24}
            color={
              allComments.length === 0 ? COLORS.secondaryText : COLORS.accent
            }
          />
          <Text style={styles.commentText}>{allComments.length}</Text>
        </TouchableOpacity>
        <View style={{ ...styles.postData, marginLeft: 24 }}>
          <Feather
            name="thumbs-up"
            size={24}
            color={!userPutLike ? COLORS.secondaryText : COLORS.accent}
            onPress={handleLikes}
          />
          <Text style={styles.commentText}>{allLikes.length}</Text>
        </View>
        <View style={styles.postLocation}>
          <Feather name="map-pin" size={24} color={COLORS.secondaryText} />
          <Text
            style={styles.locationText}
            onPress={() =>
              navigation.navigate("Map", { geoLocation, photoLocation })
            }
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