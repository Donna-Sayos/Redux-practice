import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { todoReducer } from "./reducers/todoReducer";

const middleware = [createLogger({ collapsed: true })];

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware,
});

export default store;