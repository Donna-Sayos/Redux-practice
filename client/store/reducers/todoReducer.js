import * as actions from "../actions/actionTypes";

const initialState = {
  past: [],
  present: [], // current state
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
      return {
        past: [...state.past, state.present],
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
      const newPast = state.past.slice(0, state.past.length - 1); // return all the items in the past array except the last item
      return {
        past: newPast,
        present: prevState,
        future: [state.present, ...state.future], // add the current state to the beginning of the future array
      };

    case actions.REDO:
      if (state.future.length === 0) return state;

      const nextState = state.future[0]; 
      const newFuture = state.future.slice(1);
      return {                                 //         PAST   /   PRESENT   /   FUTURE
        past: [...state.past, state.present],  //              <---          <---
        present: nextState,                    //     PRESENT   /   FUTURE[0]   /   the rest of the future array
        future: newFuture,
      };

    default:
      return state;
  }
};
