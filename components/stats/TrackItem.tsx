import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { StoreInterface } from "../../store/store";
import * as Linking from "expo-linking";

interface TrackItemProps {
  data: SpotifyApi.TrackObjectFull | undefined;
  index: number;
}

const TrackItem = (props: TrackItemProps) => {
  // TODO: add pressable link on the track to redirect to spotify
  const { data, index } = props;
  const { t } = useTranslation();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);

  const onPressHandler = () => {
    const url = data?.external_urls.spotify;
    if (!url) return;
    Linking.openURL(url);
  };

  const styles = StyleSheet.create({
    trackContainer: {
      borderWidth: 2,
      borderColor: theme.primary500,
      backgroundColor: theme.primary300,
      margin: 24,
      borderRadius: 8,
      flexWrap: "wrap",
      width: 300,
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      height: 450,
      color: "black",
      elevation: 2,
    },
    containerImage: {
      width: "100%",
      height: 300,
    },
    image: {
      width: "100%",
      height: 300,
      position: "relative",
      top: 0,
      borderRadius: 4,
    },
    infoContainer: {
      flex: 1,
      justifyContent: "space-evenly",
    },
    trackName: {
      fontSize: 24,
      textAlign: "center",
    },
    popularity: {
      textAlign: "center",
    },
    itemIndex: {
      position: "absolute",
      bottom: 16,
      left: 16,
      height: 40,
      width: 40,
      backgroundColor: theme.primary300,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.primary500,
    },
    index: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.trackContainer}>
      <View style={styles.containerImage}>
        <Pressable onPress={onPressHandler}>
          <Image
            style={styles.image}
            source={{ uri: data?.album.images.at(1)?.url }}
          />
        </Pressable>
        <View style={styles.itemIndex}>
          <Text style={styles.index}>{index + 1}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.trackName}>{data?.name}</Text>
        <Text style={styles.popularity}>
          {t("stats.popularity")}: {data?.popularity}
        </Text>
      </View>
    </View>
  );
};

export default TrackItem;
