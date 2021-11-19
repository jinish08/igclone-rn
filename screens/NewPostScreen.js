import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddNewPost from "../components/new post/AddNewPost";

const NewPostScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AddNewPost navigation={navigation} />
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 0,
    height: "100%",
    paddingTop: 30,
  },
});
