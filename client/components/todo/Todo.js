import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";

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
  fetchTodos: () => dispatch(thunks.fetchTodos_()),
  fetchSingleTodo: (id) => dispatch(thunks.fetchSingleTodo_(id)),
  addTodo: (todo) => dispatch(thunks.addTodo_(todo)),
  removeTodo: (id) => dispatch(thunks.removeTodo_(id)),
  toggleTodo: (id) => dispatch(thunks.toggleTodo_(id)),
  updateTodo: (id, todo) => dispatch(thunks.updateTodo_(id, todo)),
  clearTodos: () => dispatch(thunks.clearTodos_()),
});

export default connect(mapState, mapDispatch)(Todo);
