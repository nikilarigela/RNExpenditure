import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import logger from "redux-logger";

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(logger));
};

const store = configureStore();

export default store;
