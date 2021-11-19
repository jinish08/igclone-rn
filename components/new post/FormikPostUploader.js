import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements/dist/divider/Divider";
import validUrl from "valid-url";
import { auth, db } from "../../firebase";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has rechead the character limit"),
});

const PLACEHOLDER_IMG = "https://picsum.photos/400";

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUsername = () => {
    const user = auth.currentUser;
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: auth.currentUser.uid,
        owner_email: auth.currentUser.email,
        caption: caption,
        createdAt: new Date().toLocaleString(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());

    return unsubscribe;
  };

  return (
    <>
      <Formik
        initialValues={{ caption: "", imageUrl: "" }}
        onSubmit={(values) => {
          uploadPostToFirebase(values.imageUrl, values.caption);
        }}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View style={styles.contianer}>
              <Image
                source={{
                  uri: validUrl.isUri(thumbnailUrl)
                    ? thumbnailUrl
                    : PLACEHOLDER_IMG,
                }}
                style={{ width: 100, height: 100 }}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TextInput
                  placeholder="Enter a Caption ...."
                  style={{ color: "white", fontSize: 20 }}
                  placeholderTextColor="gray"
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
              </View>
            </View>
            <Divider orientation={"vertical"} />
            <TextInput
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              placeholder="Enter Image Url"
              style={{ color: "white", fontSize: 18 }}
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
            {errors.imageUrl && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.imageUrl}
              </Text>
            )}
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({
  contianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
});
