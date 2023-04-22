import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import reducer from "./reducers/reducer";

const middleware = [createLogger({ collapsed: true })];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
