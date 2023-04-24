import * as actions from "../actions/actionTypes";

let lastId = 0;

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_TODO:
      return [
        ...state,
        { id: ++lastId, description: action.payload.description, isCompleted: false },
      ];

    case actions.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);

    case actions.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );

    case actions.UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, description: action.payload.description }
          : todo
      );

    default: {
      return state;
    }
  }
};
