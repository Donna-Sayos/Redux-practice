import store from "./store";
import {
  bugCreated,
  bugResolved,
  bugRemoved,
} from "./store/actions/actionCreators";

const unsubscribe = store.subscribe(() => {
  console.log("STORE CHANGED: ", store.getState());
});

store.dispatch(bugCreated("Bug #1"));
store.dispatch(bugResolved(1));
store.dispatch(bugRemoved(1));

unsubscribe();

console.log("STORE STATE: ", store.getState());
