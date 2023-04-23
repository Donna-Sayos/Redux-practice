import * as actions from "../actions/actionTypes";

let lastId = 0;

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_TODO:
      return [
        ...state,
        { id: ++lastId, todo: action.payload.todo, status: false },
      ];

    case actions.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);

    case actions.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, status: !todo.status } : todo
      );

    case actions.UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );

    default: {
      return state;
    }
  }
};
