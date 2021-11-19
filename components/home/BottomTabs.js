import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";

export const bottomTabButtons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home",
    inactive: "https://img.icons8.com/fluency-systems-regular/48/ffffff/home",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full",
  },
  {
    name: "Profile",
    active:
      "https://qph.fs.quoracdn.net/main-qimg-ab45488a5f2a231287ab232486154ae0-lq",
    inactive:
      "https://qph.fs.quoracdn.net/main-qimg-ab45488a5f2a231287ab232486154ae0-lq",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTabs, setActiveTabs] = useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTabs(icon.name)}>
      <Image
        source={{ uri: activeTabs === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTabs === "Profile" && icon.name === activeTabs
            ? styles.profilePic(activeTabs)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      {/* <Divider width={1} orientation="vertical" /> */}
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingBottom: 10,
    zIndex: 999,
    backgroundColor: "black",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTabs = "") => ({
    borderRadius: 50,
    borderWidth: activeTabs === "Profile" ? 2 : 0,
    borderColor: "#fff",
  }),
});
