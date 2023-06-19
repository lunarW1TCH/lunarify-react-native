import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Navigation from "./components/Navigation";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";

import store, { persistor } from "./store/store";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
