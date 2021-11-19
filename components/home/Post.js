import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { auth, db, firebase } from "../../firebase";

const postFooterIcons = [
  {
    name: "Like",
    imgUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
    likedImage: "https://img.icons8.com/ios-glyphs/90/fa314a/like--v1.png",
  },
  {
    name: "Comment",
    imgUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/speech-bubble.png",
  },
  {
    name: "Share",
    imgUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane.png",
  },
  {
    name: "Save",
    imgUrl: "https://img.icons8.com/material-outlined/60/ffffff/price-tag.png",
  },
];

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      auth.currentUser.email
    );

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
          : firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        console.log("Document succesfully updated");
      })
      .catch((error) => {
        console.error("Error updating document", error);
      });
  };
  return (
    <View style={{ marginBottom: 30 }}>
      {/* <Divider width={1} orientation="vertical" /> */}
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text
        style={{
          color: "white",
          marginLeft: 5,
          fontWeight: "700",
          fontSize: 14,
        }}
      >
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}> ... </Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      style={{ height: "100%", resizeMode: "cover" }}
      source={{ uri: post.imageUrl }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFooterIconContianer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likes_by_users.includes(auth.currentUser.email)
              ? postFooterIcons[0].likedImage
              : postFooterIcons[0].imgUrl,
          }}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imgUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imgUrl} />
    </View>
    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imgUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ color: "white", fontWeight: "700" }}>{post.user}</Text>
      <Text style={{ color: "white" }}> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all " : " "}
        {post.comments.length}
        {post.comments.length > 1 ? " comments" : " comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "700" }}>{post.user}</Text>
          <Text> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

export default Post;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1.6,
    marginLeft: 6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconContianer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
