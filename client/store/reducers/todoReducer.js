import * as actions from "../actions/actionTypes";

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case actions.SET_TODOS:
      return action.payload.todos;

    case actions.SET_TODO: // FIXME: remove later
      return action.payload.todo;

    case actions.ADD_TODO:
      return [...state, action.payload.todo];

    case actions.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);

    case actions.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

    case actions.UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, description: action.payload.description }
          : todo
      );

    case actions.CLEAR_TODOS:
      return [];

    default:
      return state;
  }
};
