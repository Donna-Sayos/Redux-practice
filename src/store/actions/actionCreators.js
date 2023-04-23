import * as actions from "./actionTypes";

// ACTION CREATORS
export const bugAdded = (description) => {
  return {
    type: actions.BUG_ADDED,
    payload: {
      description: description,
    },
  };
};

export const bugRemove = (id) => {
  return {
    type: actions.BUG_REMOVED,
    payload: {
      id: id,
    },
  };
};
