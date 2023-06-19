import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import TopArtists from "../screens/TopArtists";
import TopSongs from "../screens/TopSongs";
import Settings from "../screens/Settings";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../store/store";
import Auth from "../screens/Auth";
import { authActions } from "../store/auth-slice";

export type TabNavigatorParamList = {
  TopArtists: undefined;
  TopSongs: undefined;
  Settings: undefined;
  Auth: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const Navigation = () => {
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const lang = useSelector((state: StoreInterface) => state.ui.lang);
  const auth = useSelector((state: StoreInterface) => state.auth);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.backgroundColor,
    },
    dark: false,
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.primary300,
          },
          tabBarStyle: {
            backgroundColor: theme.primary300,
          },
          tabBarActiveTintColor: theme.primary900,
          tabBarInactiveTintColor: "#666",
        }}
      >
        {auth.token && (
          <>
            <Tab.Screen
              name="TopArtists"
              component={TopArtists}
              options={{
                tabBarIcon: ({ size, color }) => {
                  return (
                    <Ionicons name="person-sharp" color={color} size={size} />
                  );
                },
                tabBarLabel: t("stats.artists"),
                title: t("stats.artists"),
              }}
            />
            <Tab.Screen
              name="TopSongs"
              component={TopSongs}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Ionicons name="musical-notes" color={color} size={size} />
                ),
                tabBarLabel: t("stats.songs"),
                title: t("stats.songs"),
              }}
            />
          </>
        )}
        {!auth.token && (
          <Tab.Screen
            name="Auth"
            component={Auth}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="log-in" color={color} size={size} />
              ),
              tabBarLabel: t("navigation.login"),
              title: t("navigation.login"),
            }}
          />
        )}
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="settings-sharp" color={color} size={size} />
            ),
            tabBarLabel: t("navigation.settings"),
            title: t("navigation.settings"),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
