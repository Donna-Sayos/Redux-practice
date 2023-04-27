import * as actionCreators from "./actionCreators";
import Axios from "axios";

// THUNKS
export const fetchTodos_ = () => async (dispatch) => {
  try {
    const { data } = await Axios.get(`http://localhost:5001/api/v1/todos`);
    console.log(`fetchTodos triggered. ALL DATA FETCHED: ${data}`); // TODO: remove later
    dispatch(actionCreators.setTodos(data));
  } catch (err) {
    console.log(`Error in fetchTodos thunk: ${err}`);
  }
};

export const fetchSingleTodo_ = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`http://localhost:5001/api/v1/todos/${id}`);
    console.log(`fetchSingleTodo triggered. DATA FETCHED: ${data}`); // TODO: remove later
    dispatch(actionCreators.setTodo(data));
  } catch (err) {
    console.log(`Error in fetchSingleTodo thunk: ${err}`);
  }
};

export const addTodo_ = (todo) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`http://localhost:5001/api/v1/todos`, { description: todo });
    console.log(`addTodo triggered. DATA ADDED: ${data}`); // TODO: remove later
    dispatch(actionCreators.addTodo(data));
  } catch (err) {
    console.log(`Error in addTodo thunk: ${err}`);
  }
};

export const removeTodo_ = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.delete(`http://localhost:5001/api/v1/todos/${id}`);
    console.log(`removeTodo triggered. DATA REMOVED:${data}`); // TODO: remove later
    dispatch(actionCreators.removeTodo(data.id));
  } catch (err) {
    console.log(`Error in removeTodo thunk: ${err}`);
  }
};

export const toggleTodo_ = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.put(`http://localhost:5001/api/v1/todos/${id}/toggle`);
    console.log(`toggleTodo triggered. DATA TOGGLED: ${data}`); // TODO: remove later
    dispatch(actionCreators.toggleTodo(data.id));
  } catch (err) {
    console.log(`Error in toggleTodo thunk: ${err}`);
  }
};

export const updateTodo_ = (id, todo) => async (dispatch) => {
  try {
    const { data } = await Axios.put(`http://localhost:5001/api/v1/todos/${id}`, {
      description: todo,
    });
    console.log(`updateTodo triggered. DATA UPDATED: ${data}`); // TODO: remove later
    dispatch(actionCreators.updateTodo(data.id, data));
  } catch (err) {
    console.log(`Error in updateTodo thunk: ${err}`);
  }
};

export const clearTodos_ = () => async (dispatch) => {
  try {
    await Axios.delete(`http://localhost:5001/api/v1/todos/clear`);
    console.log(`clearTodos triggered`); // TODO: remove later
    dispatch(actionCreators.clearTodos());
  } catch (err) {
    console.log(`Error in clearTodos thunk: ${err}`);
  }
};
