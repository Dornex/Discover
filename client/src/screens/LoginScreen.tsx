import React from "react";
import LoginForm from "../components/LoginForm";
import { View } from "react-native";

const LoginScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </View>
  );
};

export default LoginScreen;
