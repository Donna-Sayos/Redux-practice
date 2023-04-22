import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers/reducer";

const middleware = composeWithDevTools(
  applyMiddleware(createLogger({ collapsed: true })) // middleware to log the state changes;
);

const store = createStore(reducer, middleware);
export default store;