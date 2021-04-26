import { useNavigation } from "@react-navigation/core";
import { useFormik } from "formik";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { COLORS } from "../constants/Colors";
import Button from "./Button";
import TextInput from "./TextInput";

const LoginForm = () => {
  const { navigate } = useNavigation();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => console.log(values),
  });

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          icon="mail"
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={handleChange("email")}
          value={values.email}
        />
      </View>

      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          icon="key"
          placeholder="Enter your password"
          autoCapitalize="none"
          keyboardType="password"
          secureTextEntry
          onChangeText={handleChange("password")}
          value={values.password}
        />
      </View>

      <Button
        onPress={() => {
          handleSubmit();
        }}
        label="LOGIN"
      />

      <TouchableOpacity
        onPress={() => {
          navigate("RegisterScreen");
        }}
      >
        <Text style={{ color: COLORS.ORANGE, fontSize: 16, marginTop: 10 }}>
          Do you want to create an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
