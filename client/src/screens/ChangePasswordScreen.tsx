import { useNavigation } from "@react-navigation/core";
import { useFormik } from "formik";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import StyledText from "../components/StyledText";
import TextInput from "../components/TextInput";
import { useChangePasswordMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Container = styled.View`
  width: 100%;
  height: 100%;
  margin-top: 100px;
  align-items: center;
`;

const ChangePasswordScreen = () => {
  const { goBack } = useNavigation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { currentPassword: "", newPassword: "" },
    onSubmit: async (values, { setErrors }) => {
      const resp = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (resp.data?.changePassword === false) {
        setErrors({ currentPassword: "Password is invalid!" });
      } else {
        goBack();
      }
      return null;
    },
  });

  const [, changePassword] = useChangePasswordMutation();

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <View style={{ marginTop: 10 }}>
        <BackButton
          onPress={() => {
            goBack();
          }}
        />
      </View>

      <Container>
        <StyledText fontSize={24} fontWeight={700} style={{ marginBottom: 25 }}>
          Change your password
        </StyledText>
        <View
          style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
        >
          <TextInput
            icon="key"
            error={touched.currentPassword && errors.currentPassword}
            placeholder="Enter your current password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={handleChange("currentPassword")}
            value={values.currentPassword}
          />
        </View>

        <View
          style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
        >
          <TextInput
            icon="key"
            error={touched.newPassword && errors.newPassword}
            placeholder="Enter your new password"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={handleChange("newPassword")}
            value={values.newPassword}
          />

          <View
            style={{
              marginTop: 45,
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => {
                handleSubmit();
              }}
              label="CHANGE PASSWORD"
            />
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
