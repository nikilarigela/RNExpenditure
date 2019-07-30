import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./js/Appnavigator";
import store from "./js/store/store";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#212121",
    accent: "#fff"
  }
};

class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <PaperProvider theme={theme}>
            <AppNavigator />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}

export default App;
