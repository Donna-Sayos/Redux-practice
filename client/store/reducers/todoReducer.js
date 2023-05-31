import * as actions from "../actions/actionTypes";

const initialState = {
  past: [],
  present: [], // current state
  future: [],
};

const MAX_HISTORY = 5;

export const todoReducer = (state = initialState, action, dispatch) => {
  switch (action.type) {
    case actions.SET_TODOS:
      return {
        ...state,
        present: action.payload.todos,
      };

    case actions.ADD_TODO:
      let newAddPast = [...state.past, state.present];
      if (newAddPast.length > MAX_HISTORY) newAddPast.shift(); // remove the first item in the array

      const newTodo = {
        ...action.payload.todo,
        createdAt: action.payload.todo.createdAt || null,
      };

      return {
        past: newAddPast,
        present: [...state.present, newTodo],
        future: [],
      };

    case actions.REMOVE_TODO:
      let newRemovedPast = [...state.past, state.present];
      if (newRemovedPast.length > MAX_HISTORY) newRemovedPast.shift();

      return {
        past: newRemovedPast,
        present: state.present.filter((todo) => todo.id !== action.payload.id),
        future: [],
      };

    case actions.TOGGLE_TODO:
      let newToggledPast = [...state.past, state.present];
      if (newToggledPast.length > MAX_HISTORY) newToggledPast.shift();

      return {
        past: newToggledPast,
        present: state.present.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
        future: [],
      };

    case actions.UPDATE_TODO:
      let newUpdatedPast = [...state.past, state.present];
      if (newUpdatedPast.length > MAX_HISTORY) newUpdatedPast.shift();

      return {
        past: newUpdatedPast,
        present: state.present.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, description: action.payload.description }
            : todo
        ),
        future: [],
      };

    case actions.CLEAR_TODOS:
      let newClearedPast = [...state.past, state.present];
      if (newClearedPast.length > MAX_HISTORY) newClearedPast.shift();

      return {
        past: newClearedPast,
        present: [],
        future: [],
      };

    case actions.UNDO: // FIXME: testing feature
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      const newFuture = [state.present, ...state.future];

      newPast.length > MAX_HISTORY && newPast.shift();
      newFuture.length > MAX_HISTORY && newFuture.pop();

      return {
        past: newPast,
        present: previous,
        future: newFuture,
      };

    case actions.REDO: // FIXME: testing feature
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const newFuture2 = state.future.slice(1);
      const newPast2 = [...state.past, state.present];

      newPast2.length > MAX_HISTORY && newPast2.shift();
      newFuture2.length > MAX_HISTORY && newFuture2.pop();

      return {
        past: newPast2,
        present: next,
        future: newFuture2,
      };

    default:
      return state;
  }
};
