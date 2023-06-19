import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { StoreInterface } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../helpers/spotifyApiFetch";
import { useRefreshToken } from "../helpers/auth";
import { statsActions } from "../store/stats-slice";
import StatsTimeRange from "../components/stats/StatsTimeRange";
import { useEffect, useState } from "react";
import TrackItem from "../components/stats/TrackItem";
import { useTranslation } from "react-i18next";

const TopSongs = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const auth = useSelector((state: StoreInterface) => state.auth);
  const songs = useSelector((state: StoreInterface) => state.stats.songs);
  const { t } = useTranslation();
  const [range, setRange] = useState<string>("medium_term");
  const [error, setError] = useState("");
  useRefreshToken();

  useEffect(() => {
    const getSongs = async () => {
      if (!auth.token) return;
      if (range === "short_term" && songs.short) return;
      if (range === "medium_term" && songs.medium) return;
      if (range === "long_term" && songs.long) return;
      try {
        const response = await fetchSongs(auth.token, range);

        switch (range) {
          case "short_term":
            dispatch(statsActions.setSongsShort(response));
            break;
          case "medium_term":
            dispatch(statsActions.setSongsMedium(response));
            break;
          case "long_term":
            dispatch(statsActions.setSongsLong(response));
            break;
          default:
            break;
        }

        setError("");
      } catch (error) {
        setError(t("error.message"));
      }
    };

    getSongs();
  }, [dispatch, auth, range, songs.short, songs.medium, songs.long]);

  const styles = StyleSheet.create({
    text: {
      color: theme.mainTextColor,
    },
    topSongsContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    spinner: {
      marginTop: 16,
    },
  });

  return (
    <View style={styles.topSongsContainer}>
      <StatsTimeRange range={range} setRange={setRange} />
      {error && <Text>{error}</Text>}

      {range === "short_term" && songs.short && songs.short.items && (
        <FlatList
          data={songs.short.items}
          renderItem={(itemData) => (
            <TrackItem index={itemData.index} data={itemData.item} />
          )}
        />
      )}
      {range === "short_term" && !songs.short && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={theme.primary300}
        />
      )}
      {range === "medium_term" && songs.medium && songs.medium.items && (
        <FlatList
          data={songs.medium.items}
          renderItem={(itemData) => (
            <TrackItem index={itemData.index} data={itemData.item} />
          )}
        />
      )}
      {range === "medium_term" && !songs.medium && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={theme.primary300}
        />
      )}
      {range === "long_term" && songs.long && songs.long.items && (
        <FlatList
          data={songs.long.items}
          renderItem={(itemData) => (
            <TrackItem index={itemData.index} data={itemData.item} />
          )}
        />
      )}
      {range === "long_term" && !songs.long && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={theme.primary300}
        />
      )}
    </View>
  );
};

export default TopSongs;
