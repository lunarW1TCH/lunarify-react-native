import { StyleSheet, ScrollView, View } from "react-native";
import { THEMES } from "../../helpers/themes";
import ThemeItem from "./ThemeItem";

const ChooseTheme = () => {
  return (
    <ScrollView style={styles.themesContainer}>
      <View style={styles.contentContainer}>
        {THEMES.map((theme) => (
          <ThemeItem key={theme.name} theme={theme} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ChooseTheme;

const styles = StyleSheet.create({
  contentContainer: {
    margin: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 40,
  },
  themesContainer: {
    height: "100%",
    width: "100%",
  },
});
