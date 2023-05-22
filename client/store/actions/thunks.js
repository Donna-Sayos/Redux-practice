import * as actionCreators from "./actionCreators";
import { MAX_HISTORY } from "../reducers/todoReducer";
import Axios from "axios";

// THUNKS
export const fetchTodos_ = () => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/api/v1/todos`);
    dispatch(actionCreators.setTodos(data));
  } catch (err) {
    console.log(`Error in fetchTodos thunk: ${err}`);
  }
};

export const addTodo_ =
  (todo, timeStamp = null) =>
  async (dispatch) => {
    const todoData = {
      ...todo,
      createdAt: timeStamp || null,
    };

    try {
      const { data } = await Axios.post(`/api/v1/todos`, todoData);
      dispatch(actionCreators.addTodo(data));
    } catch (err) {
      console.log(`Error in addTodo thunk: ${err}`);
    }
  };

export const removeTodo_ = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.delete(`/api/v1/todos/${id}`);
    dispatch(actionCreators.removeTodo(data.id));
  } catch (err) {
    console.log(`Error in removeTodo thunk: ${err}`);
  }
};

export const toggleTodo_ = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.put(`/api/v1/todos/${id}/toggle`);
    dispatch(actionCreators.toggleTodo(data.id));
  } catch (err) {
    console.log(`Error in toggleTodo thunk: ${err}`);
  }
};

export const updateTodo_ = (id, todo) => async (dispatch) => {
  try {
    const { data } = await Axios.put(`/api/v1/todos/${id}`, todo);
    dispatch(actionCreators.updateTodo(data.id, data));
  } catch (err) {
    console.log(`Error in updateTodo thunk: ${err}`);
  }
};

export const clearTodos_ = () => async (dispatch) => {
  try {
    await Axios.delete(`/api/v1/todos/clear`);
    dispatch(actionCreators.clearTodos());
  } catch (err) {
    console.log(`Error in clearTodos thunk: ${err}`);
  }
};

export const undo_ = () => async (dispatch, getState) => {
  const { todos } = getState();

  console.log("todos", todos);

  if (todos.past.length === 0) return;

  const prevState = todos.past[todos.past.length - 1];
  console.log("prevState", ...prevState);
  console.log("todos.present", todos.present);
  const newUndoFuture = [todos.present, ...todos.future];

  if (newUndoFuture.length > MAX_HISTORY) newUndoFuture.pop();

  if (prevState.length !== 0 && prevState.length < todos.present.length) {
    const removedTodo = prevState.find(
      (todo) => !todos.present.some((t) => t.id === todo.id)
    );

    if (removedTodo) {
      try {
        await dispatch(removeTodo_(removedTodo.id));
      } catch (err) {
        console.log(`Error re-adding todo: ${err}`);
      }
    }
  } else if (
    prevState.length > todos.present.length &&
    todos.present.length > 0
  ) {
    const addedTodo = prevState.find(
      (todo) => !todos.present.some((t) => t.id === todo.id)
    );
    7;
    console.log("addedTodo", addedTodo);

    if (addedTodo) {
      try {
        console.log("addTodo.createdAt", addedTodo.createdAt);
        await dispatch(addTodo_(addedTodo, addedTodo.createdAt));
      } catch (err) {
        console.log(`Error removing todo: ${err}`);
      }
    }
  } else if (prevState.length === 0 && todos.present.length > 0) {
    try {
      await dispatch(clearTodos_());
    } catch (err) {
      console.log(`Error clearing todos: ${err}`);
    }
  } else if (prevState.length > 0 && todos.present.length === 0) {
    try {
      for (const todo of prevState) {
        console.log("todo", todo);
        await dispatch(addTodo_(todo, todo.createdAt));
      }
    } catch (err) {
      console.log(`Error adding todos: ${err}`);
    }
  }
};

export const redo_ = () => (dispatch) => {
  dispatch(actionCreators.redo());
};
