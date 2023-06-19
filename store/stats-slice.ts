import { createSlice } from '@reduxjs/toolkit';

export interface StatsSlice {
  artists: {
    long: SpotifyApi.UsersTopArtistsResponse | null;
    medium: SpotifyApi.UsersTopArtistsResponse | null;
    short: SpotifyApi.UsersTopArtistsResponse | null;
  };
  songs: {
    long: SpotifyApi.UsersTopTracksResponse | null;
    medium: SpotifyApi.UsersTopTracksResponse | null;
    short: SpotifyApi.UsersTopTracksResponse | null;
  };
}

const initialState: StatsSlice = {
  artists: { long: null, medium: null, short: null },
  songs: { long: null, medium: null, short: null },
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setArtistsLong(state, action) {
      state.artists.long = action.payload;
    },
    setArtistsMedium(state, action) {
      state.artists.medium = action.payload;
    },
    setArtistsShort(state, action) {
      state.artists.short = action.payload;
    },
    setSongsLong(state, action) {
      state.songs.long = action.payload;
    },
    setSongsMedium(state, action) {
      state.songs.medium = action.payload;
    },
    setSongsShort(state, action) {
      state.songs.short = action.payload;
    },
  },
});

export const statsActions = statsSlice.actions;

export default statsSlice;
