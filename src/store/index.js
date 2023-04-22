import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers/reducer";

const middleware = createLogger({ collapsed: true });

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers:
    process.env.NODE_ENV !== "production" ? [composeWithDevTools()] : [], // if the environment is not production, use the composeWithDevTools
});

export default store;
