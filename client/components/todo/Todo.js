import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchTodos_,
  fetchSingleTodo_,
  addTodo_,
  removeTodo_,
  toggleTodo_,
  updateTodo_,
  clearTodos_,
} from "../../store/actions/thunks";

function Todo({ todos, fetchTodos }) {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return <div>Todo</div>;
}

const mapState = (state) => ({
  todos: state.todos,
});

const mapDispatch = (dispatch) => ({
  fetchTodos: () => dispatch(fetchTodos_()),
  fetchSingleTodo: (id) => dispatch(fetchSingleTodo_(id)),
  addTodo: (todo) => dispatch(addTodo_(todo)),
  removeTodo: (id) => dispatch(removeTodo_(id)),
  toggleTodo: (id) => dispatch(toggleTodo_(id)),
  updateTodo: (id, todo) => dispatch(updateTodo_(id, todo)),
  clearTodos: () => dispatch(clearTodos_()),
});

export default connect(mapState, mapDispatch)(Todo);
