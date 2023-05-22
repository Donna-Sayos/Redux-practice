import * as actions from "../actions/actionTypes";

const initialState = {
  past: [],
  present: [], // current state
  future: [],
};

const MAX_HISTORY = 5;

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TODOS:
      return {
        ...state,
        present: action.payload.todos,
      };

    case actions.ADD_TODO:
      let newAddPast = [...state.past, state.present];
      if (newAddPast.length > MAX_HISTORY) newAddPast.shift(); // remove the first item in the array
      return {
        past: newAddPast,
        present: [...state.present, action.payload.todo],
        future: [],
      };

    case actions.REMOVE_TODO:
      return {
        past: [...state.past, state.present],
        present: state.present.filter((todo) => todo.id !== action.payload.id),
        future: [],
      };

    case actions.TOGGLE_TODO:
      return {
        past: [...state.past, state.present],
        present: state.present.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
        future: [],
      };

    case actions.UPDATE_TODO:
      return {
        past: [...state.past, state.present],
        present: state.present.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, description: action.payload.description }
            : todo
        ),
        future: [],
      };

    case actions.CLEAR_TODOS:
      return {
        past: [...state.past, state.present],
        present: [],
        future: [],
      };

    case actions.UNDO:
      if (state.past.length === 0) return state;

      const prevState = state.past[state.past.length - 1]; // grab last item in past array
      const newUndoPast = state.past.slice(0, state.past.length - 1); // return all the items in the past array except the last item
      const newUndoFuture = [state.present, ...state.future]; // add the current state to the beginning of the future array

      if (newUndoFuture.length > MAX_HISTORY) newUndoFuture.pop(); // remove the last item in the future array

      return {
        past: newUndoPast,
        present: prevState,
        future: newUndoFuture,
      };

    case actions.REDO:
      if (state.future.length === 0) return state;

      const nextState = state.future[0]; // grab the first item in the future array
      const newFuture = state.future.slice(1); // return all the items in the future array except the first item
      const newRedoPast = [...state.past, state.present]; // add the current state to the end of the past array

      if (newRedoPast.length > MAX_HISTORY) newRedoPast.shift(); // if the past array is longer than the max history, remove the first item in the array

      return {
        //         PAST   /   PRESENT   /   FUTURE
        past: newRedoPast, //              <---          <---
        present: nextState, //     PRESENT   /   FUTURE[0]   /   the rest of the future array
        future: newFuture,
      };

    default:
      return state;
  }
};
