import { Dispatch } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useSelector } from "react-redux";
import { StoreInterface } from "../../store/store";

interface StatsTimeRangeProps {
  range: string;
  setRange: Dispatch<string>;
}

const StatsTimeRange = (props: StatsTimeRangeProps) => {
  const { range, setRange } = props;
  const { t } = useTranslation();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);

  const styles = StyleSheet.create({
    timeRangeContainer: {
      width: 300,
      height: 50,
      marginVertical: 8,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: theme.primary500,
      backgroundColor: theme.primary300,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      overflow: "hidden",
      elevation: 2,
    },
    chosenRange: {
      backgroundColor: theme.primary500,
      borderRadius: 8,
    },

    button: {
      width: 100,
      height: 50,
      justifyContent: "center",
    },
    buttonText: {
      textAlign: "center",
    },
  });

  const onPressHandler = (timeRange: string) => {
    setRange(timeRange);
  };

  return (
    <View style={styles.timeRangeContainer}>
      <Pressable
        onPress={onPressHandler.bind(null, "short_term")}
        style={[styles.button, range === "short_term" && styles.chosenRange]}
      >
        <Text style={styles.buttonText}>{t("stats.last4Weeks")}</Text>
      </Pressable>
      <Pressable
        onPress={onPressHandler.bind(null, "medium_term")}
        style={[styles.button, range === "medium_term" && styles.chosenRange]}
      >
        <Text style={styles.buttonText}>{t("stats.last6Months")}</Text>
      </Pressable>
      <Pressable
        onPress={onPressHandler.bind(null, "long_term")}
        style={[styles.button, range === "long_term" && styles.chosenRange]}
      >
        <Text style={styles.buttonText}>{t("stats.allTime")}</Text>
      </Pressable>
    </View>
  );
};

export default StatsTimeRange;
