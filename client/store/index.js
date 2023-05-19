import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import undoable from "redux-undo";
import { todoReducer } from "./reducers/todoReducer";

const middleware = [thunkMiddleware, createLogger({ collapsed: true })];

const store = configureStore({
  reducer: {
    todos: undoable(todoReducer, { limit: 10 }),
  },
  middleware,
});

export default store;
