import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { USERS } from "../../data/users";

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image style={styles.story} source={{ uri: story.image }} />
            <Text style={{ color: "white", fontSize: 13 }}>
              {story.user.length > 9
                ? story.user.slice(0, 8).toLowerCase() + "..."
                : story.user}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    marginLeft: 18,
    borderColor: "#ff8501",
  },
});
