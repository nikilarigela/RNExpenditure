import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(logger));
  let persistor = persistStore(store);
  return { store, persistor };
};

const store = configureStore();

export default store;
