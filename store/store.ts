import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import statsSlice, { StatsSlice } from "./stats-slice";
import uiSlice, { UISlice } from "./ui-slice";
import authSlice, { AuthSlice } from "./auth-slice";

export interface StoreInterface {
  stats: StatsSlice;
  ui: UISlice;
  auth: AuthSlice;
}

const persistConfig = {
  key: "lunarify",
  storage: AsyncStorage,
  blacklist: ["stats"],
};

const rootReducer = combineReducers({
  stats: statsSlice.reducer,
  ui: uiSlice.reducer,
  auth: authSlice.reducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
