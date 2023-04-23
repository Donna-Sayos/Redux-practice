import * as actions from "./actionTypes";

// ACTION CREATORS
export const addTodo = (todo) => ({
  type: actions.ADD_TODO,
  payload: {
    todo,
  },
});

export const removeTodo = (id) => ({
  type: actions.REMOVE_TODO,
  payload: {
    id,
  },
});

export const toggleTodo = (id) => ({
  type: actions.TOGGLE_TODO,
  payload: {
    id,
  },
});

export const updateTodo = (id, todo) => ({
  type: actions.UPDATE_TODO,
  payload: {
    id,
    todo,
  },
});
