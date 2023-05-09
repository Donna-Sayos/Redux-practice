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

function Todos({ todos, fetchTodos }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos) {
      setTodoList(
        [...todos].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    }
  }, [todos]);

  console.log("todoList", todoList);

  return (
    <Container maxWidth="lg">
      <div>
        <h1>TODO List</h1>
      </div>
      <AddTodo />
      {todoList && todoList.length > 0 ? (
        <div>
          {todoList.map((todo) => (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              key={todo.id}
            >
              <SingleTodo todo={todo} fetchTodos={fetchTodos} />
            </Grid>
          ))}
        </div>
      ) : (
        <div>
          <p>You have no tasks.</p>
        </div>
      )}
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
