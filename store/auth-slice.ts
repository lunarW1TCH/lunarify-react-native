import { createSlice } from "@reduxjs/toolkit";
import { TokenResponse } from "expo-auth-session";

export interface AuthSlice {
  token: string | null;
  refreshToken: string | null;
  timestamp: number | null;
  redirectUri: string | null;
}

const initialState: AuthSlice = {
  token: null,
  refreshToken: null,
  timestamp: null,
  redirectUri: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.timestamp = Date.now();
    },
    setRedirectUri(state, action) {
      state.redirectUri = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
