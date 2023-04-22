import store from "./store";
import * as actions from "./store/actions/actions";

const unsubscribe = store.subscribe(() => {
  console.log("STORE CHANGED: ", store.getState());
});

store.dispatch({
  type: actions.BUG_ADDED,
  payload: {
    description: "adding bug #1",
  },
});

store.dispatch({
  type: actions.BUG_REMOVED,
  payload: {
    id: 1,
  },
});

unsubscribe(); 

console.log("STORE STATE: ", store.getState());
