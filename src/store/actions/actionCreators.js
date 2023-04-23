import * as actions from "./actionTypes";

// ACTION CREATORS
export const bugCreated = (description) => ({
  type: actions.BUG_CREATED,
  payload: {
    description,
  }
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});

export const bugRemoved = (id) => ({
  type: actions.BUG_REMOVED,
  payload: {
    id: id,
  },
});
