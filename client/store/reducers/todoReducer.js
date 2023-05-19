import * as actions from "../actions/actionTypes";
import { ActionCreators as UndoRedoActionCreators } from "redux-undo";

const initialState = [];

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TODOS:
      return action.payload.todos;

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

    case actions.UNDO:
      return UndoRedoActionCreators.undo(state);

    case actions.REDO:
      return UndoRedoActionCreators.redo(state);

    default:
      return state;
  }
};
