import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../index.css"
import * as thunks from "../../store/actions/thunks";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { Paper } from "@mui/material";

function Todos({ todos, fetchTodos }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (todos && todos.success && todos.data) {
      setTodoList(todos.data);
    }
  }, [todos]);

  console.log("todoList", todoList);

  return (
    <Container maxWidth="lg">
      <Paper className="paper" elevation={9} square>
        <div>
          <h1>TODO List</h1>
        </div>
      </Paper>
    </Container>
  );
}

const mapState = (state) => ({
  todos: state.todos,
});

const mapDispatch = (dispatch) => ({
  fetchTodos: () => dispatch(thunks.fetchTodos_()),
});

export default connect(mapState, mapDispatch)(Todos);
