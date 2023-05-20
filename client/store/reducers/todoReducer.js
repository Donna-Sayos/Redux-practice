import * as actions from "../actions/actionTypes";

const initialState = {
  past: [],
  present: [],
  future: [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TODOS:
      return {
        ...state,
        present: action.payload.todos,
      };

    case actions.ADD_TODO:
      // return [...state, action.payload.todo];
      return {
        past: [...state.past, state.present],
        present: [...state.present, action.payload.todo],
        future: [],
      };

    case actions.REMOVE_TODO:
      // return state.filter((todo) => todo.id !== action.payload.id);
      return {
        past: [...state.past, state.present],
        present: state.present.filter((todo) => todo.id !== action.payload.id),
        future: [],
      };

    case actions.TOGGLE_TODO:
      // return state.map((todo) =>
      //   todo.id === action.payload.id
      //     ? { ...todo, isCompleted: !todo.isCompleted }
      //     : todo
      // );
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
      // return state.map((todo) =>
      //   todo.id === action.payload.id
      //     ? { ...todo, description: action.payload.description }
      //     : todo
      // );
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
      // return [];
      return {
        past: [...state.past, state.present],
        present: [],
        future: [],
      };

    case actions.UNDO:
      if (state.past.length === 0) return state;

      const prevState = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        past: newPast,
        present: prevState,
        future: [state.present, ...state.future],
      };

    case actions.REDO:
      if (state.future.length === 0) return state;

      const nextState = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: nextState,
        future: newFuture,
      };

    default:
      return state;
  }
};
