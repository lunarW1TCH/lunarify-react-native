import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { StoreInterface } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtists } from "../helpers/spotifyApiFetch";
import { useRefreshToken } from "../helpers/auth";
import { statsActions } from "../store/stats-slice";
import ArtistItem from "../components/stats/ArtistItem";
import StatsTimeRange from "../components/stats/StatsTimeRange";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TopArtists = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const auth = useSelector((state: StoreInterface) => state.auth);
  const artists = useSelector((state: StoreInterface) => state.stats.artists);
  const { t } = useTranslation();
  const [range, setRange] = useState<string>("medium_term");
  const [error, setError] = useState("");
  useRefreshToken();

  useEffect(() => {
    const getArtists = async () => {
      if (!auth.token) return;
      if (range === "short_term" && artists.short) return;
      if (range === "medium_term" && artists.medium) return;
      if (range === "long_term" && artists.long) return;
      try {
        const response = await fetchArtists(auth.token, range);

        switch (range) {
          case "short_term":
            dispatch(statsActions.setArtistsShort(response));
            break;
          case "medium_term":
            dispatch(statsActions.setArtistsMedium(response));
            break;
          case "long_term":
            dispatch(statsActions.setArtistsLong(response));
            break;
          default:
            break;
        }

        setError("");
      } catch (error) {
        setError(t("error.message"));
      }
    };

    getArtists();
  }, [dispatch, auth, range, artists.short, artists.medium, artists.long]);

  const styles = StyleSheet.create({
    text: {
      color: theme.mainTextColor,
    },
    topArtistsContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    spinner: {
      marginTop: 16,
    },
  });

  return (
    <View style={styles.topArtistsContainer}>
      <StatsTimeRange range={range} setRange={setRange} />
      {error && <Text>{error}</Text>}
      {range === "short_term" && artists.short && artists.short.items && (
        <FlatList
          data={artists.short.items}
          renderItem={(itemData) => (
            <ArtistItem index={itemData.index} data={itemData.item} />
          )}
        />
      )}
      {range === "short_term" && !artists.short && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={theme.primary300}
        />
      )}
      {range === "medium_term" && artists.medium && artists.medium.items && (
        <FlatList
          data={artists.medium.items}
          renderItem={(itemData) => (
            <ArtistItem index={itemData.index} data={itemData.item} />
          )}
        />
      )}
      {range === "medium_term" && !artists.medium && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={theme.primary300}
        />
      )}
      {range === "long_term" && artists.long && artists.long.items && (
        <FlatList
          data={artists.long.items}
          renderItem={(itemData) => (
            <ArtistItem index={itemData.index} data={itemData.item} />
          )}
        />
      )}
      {range === "long_term" && !artists.long && (
        <ActivityIndicator
          style={styles.spinner}
          size="large"
          color={theme.primary300}
        />
      )}
    </View>
  );
};

export default TopArtists;
