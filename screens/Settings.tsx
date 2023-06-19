import { View, StyleSheet, Text } from "react-native";
import ChooseTheme from "../components/UI/ChooseTheme";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../store/store";
import { useTranslation } from "react-i18next";
import { uiActions } from "../store/ui-slice";

const languages = ["English", "Polski"];
const langValues = ["en", "pl"];

const Settings = () => {
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    languageSelect: {
      marginTop: 16,
      borderRadius: 8,
      backgroundColor: theme.primary300,
    },
    settingsContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    redirectUri: {
      color: theme.mainTextColor,
    },
  });

  return (
    <View style={styles.settingsContainer}>
      <SelectDropdown
        defaultValue={languages.at(langValues.indexOf(i18n.language))}
        buttonStyle={styles.languageSelect}
        data={languages}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          i18n.changeLanguage(langValues.at(index));
          dispatch(uiActions.setLanguage(langValues.at(index)));
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
      />
      <ChooseTheme />
    </View>
  );
};

export default Settings;
