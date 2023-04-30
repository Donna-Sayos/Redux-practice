import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"; // FIXME: to add styles here...
import { CssBaseline } from "@material-ui/core"; // FIXME: to add styles here...

function Todos({ todos, fetchTodos }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (todos && todos.success && todos.data) {
      console.log("todos", todos);
      console.log("todos.data", todos.data);
      setTodoList(todos.data);
    }
  }, [todos]);

  console.log("todoList", todoList);

  return <div>TODO</div>;
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

export default connect(mapState, mapDispatch)(Todos);
