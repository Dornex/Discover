import { useNavigation } from "@react-navigation/core";
import { useFormik } from "formik";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { COLORS } from "../constants/Colors";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import Button from "./Button";
import TextInput from "./TextInput";

const RegisterForm = () => {
  const { navigate } = useNavigation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
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
        paddingBottom: 100,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 250, height: 250 }}
        resizeMode="contain"
      />
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          icon="mail"
          error={touched.username && errors.username}
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
          error={touched.password && errors.password}
          placeholder="Enter your password"
          autoCapitalize="none"
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
