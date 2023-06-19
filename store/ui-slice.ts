import { createSlice } from "@reduxjs/toolkit";
import { LIGHT_MINT_THEME, Theme, THEMES } from "../helpers/themes";

export interface UISlice {
  theme: Theme;
  lang: string | null;
}

const initialState: UISlice = {
  theme: LIGHT_MINT_THEME,
  lang: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action) {
      const chosenTheme = THEMES.find((theme) => theme.name === action.payload);

      if (chosenTheme) {
        state.theme = chosenTheme;
      }
    },
    setLanguage(state, action) {
      state.lang = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
