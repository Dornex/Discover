import { useNavigation } from "@react-navigation/core";
import { useFormik } from "formik";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { COLORS } from "../constants/Colors";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import Button from "./Button";
import TextInput from "./TextInput";

const RegisterForm = () => {
  const { navigate } = useNavigation();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values, { setErrors }) => {
      const response = await register(values);
      if (response.data?.register.errors) {
        setErrors(toErrorMap(response.data.register.errors));
      } else if (response.data?.register.user) {
        navigate("Root");
      }
    },
  });

  const [, register] = useRegisterMutation();

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
          placeholder="Enter your username"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={handleChange("username")}
          value={values.username}
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
        label="REGISTER"
      />

      <TouchableOpacity
        onPress={() => {
          navigate("LoginScreen");
        }}
      >
        <Text style={{ color: COLORS.ORANGE, fontSize: 16, marginTop: 10 }}>
          Do you already have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
