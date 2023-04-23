import * as actions from "./actionTypes";

// ACTION CREATORS
export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  description,
  resolve: false,
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});

export const bugRemove = (id) => ({
  type: actions.BUG_REMOVED,
  payload: {
    id: id,
  },
});
