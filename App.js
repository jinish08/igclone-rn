import React from "react";
import AuthNavigation from "./AuthNavigation";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs(true);
  return <AuthNavigation />;
}
