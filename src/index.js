import store from "./store";
import { bugAdded, bugRemove } from "./store/actions/actionCreators";

const unsubscribe = store.subscribe(() => {
  console.log("STORE CHANGED: ", store.getState());
});

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugRemove(1))

unsubscribe();

console.log("STORE STATE: ", store.getState());
