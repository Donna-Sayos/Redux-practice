let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case "BUG_ADDED":
      return [
        ...state, // spread operator to copy the state array
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case "BUG_REMOVED":
      return state.filter((bug) => bug.id !== action.payload.id); // filter out the bug with the id that matches the payload id
    default: // if the action type is none of these values, return the state
      return state;
  }
}
