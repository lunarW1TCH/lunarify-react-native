import { Theme } from "../../helpers/themes";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useTranslation } from "react-i18next";

interface ThemeItemProps {
  theme: Theme;
}

const ThemeItem = (props: ThemeItemProps) => {
  const { theme } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onPressHandler = (event: GestureResponderEvent) => {
    dispatch(uiActions.setTheme(theme.name));
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.themeContainer,
        { backgroundColor: theme.primary300, borderColor: theme.primary500 },
        pressed && styles.pressed,
      ]}
      onPress={onPressHandler}
    >
      <View
        style={[styles.innerContainer, { borderColor: theme.backgroundColor }]}
      >
        <Text style={[styles.text]}>{t(`themes.${theme.name}`)}</Text>
      </View>
    </Pressable>
  );
};

export default ThemeItem;

const styles = StyleSheet.create({
  themeContainer: {
    padding: 12,
    margin: 12,
    width: "40%",
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    elevation: 2,
  },
  innerContainer: {
    borderBottomWidth: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {},
});
