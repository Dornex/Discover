import React from "react";
import RegisterForm from "../components/RegisterForm";
import { View } from "../components/Themed";

const RegisterScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RegisterForm />
    </View>
  );
};

export default RegisterScreen;
