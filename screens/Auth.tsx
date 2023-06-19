import { View, Text, StyleSheet, Pressable } from "react-native";
import { getTokenResponse } from "../helpers/auth";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { authActions } from "../store/auth-slice";
import { StoreInterface } from "../store/store";
import { useState } from "react";

const Auth = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const [error, setError] = useState("");

  const onPressHandler = async () => {
    try {
      const tokenResponse = await getTokenResponse();
      if (tokenResponse) {
        const payload = {
          token: tokenResponse.accessToken,
          refreshToken: tokenResponse.refreshToken,
        };
        console.log(tokenResponse.getRequestConfig());
        dispatch(authActions.setAuth(payload));
        setError("");
      }
    } catch (error) {
      setError(t("error.message"));
    }
  };

  const styles = StyleSheet.create({
    authContainer: {
      padding: 24,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: theme.mainTextColor,
      textAlign: "center",
      marginBottom: 12,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
    },
    button: {
      marginTop: 16,
      padding: 12,
      borderRadius: 24,
      borderColor: theme.primary500,
      backgroundColor: theme.primary300,
    },
    buttonText: {
      textAlign: "center",
      fontWeight: "bold",
    },
    pressed: {
      backgroundColor: theme.primary500,
    },
  });

  return (
    <View style={styles.authContainer}>
      <Text style={[styles.text, styles.headerText]}>
        {t("fallback.header")}
      </Text>
      <Text style={[styles.text]}>{t("fallback.paragraph")}</Text>
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>{t("fallback.button")}</Text>
      </Pressable>
      {error && <Text style={styles.text}>{error}</Text>}
    </View>
  );
};

export default Auth;
