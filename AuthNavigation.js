import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SignedInStack, SignOutStack } from "./navigation";
import { auth, firebase } from "./firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => userHandler(user)), [];
  });

  return <>{currentUser ? <SignedInStack /> : <SignOutStack />}</>;
};

export default AuthNavigation;

const styles = StyleSheet.create({});
