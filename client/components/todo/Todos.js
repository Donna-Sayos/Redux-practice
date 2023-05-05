import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import AddTodo from "./AddTodo";
import SingleTodo from "./SingleTodo";
import {
  Button,
  IconButton,
  Checkbox,
  Grid,
  Box,
  Container,
  Card,
} from "@material-ui/core";
import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  paper: {
    padding: "5px",
    textAlign: "center",
    color: "#faf0e6 !important",
    backgroundColor: "#4a6741 !important",
    maxWidth: "100vw",
    maxHeight: "100vh",
  },
}));

function Todos({ todos, fetchTodos }) {
  const [todoList, setTodoList] = useState([]);
  const cssClasses = styles();

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
      <Paper className={cssClasses.paper} elevation={9} square>
        <div>
          <h1>TODO List</h1>
        </div>
        <AddTodo setTodoList={setTodoList} />
        {todoList && todoList.length > 0 ? (
          <div>
            {todoList.map((todo) => (
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
                key={todo.id}
              >
                <SingleTodo todo={todo} />
              </Grid>
            ))}
          </div>
        ) : (
          <div>
            <p>You have no tasks.</p>
          </div>
        )}
      </Paper>
    </Container>
  );
}

const mapState = (state) => ({
  todos: state.todos,
});

const mapDispatch = (dispatch) => ({
  fetchTodos: () => dispatch(thunks.fetchTodos_()),
  clearTodos: () => dispatch(thunks.clearTodos_()),
});

export default connect(mapState, mapDispatch)(Todos);
