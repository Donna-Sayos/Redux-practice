import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { todoReducer } from "./reducers/todoReducer";

const middleware = [thunkMiddleware, createLogger({ collapsed: true })];

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware,
});

export default store;
