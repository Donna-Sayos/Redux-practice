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

function Todos({ todos, fetchTodos, removeTodo }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos) {
      setTodoList(todos);
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
              <SingleTodo todo={todo} removeTodo={removeTodo} />
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
  removeTodo: (id) => dispatch(thunks.removeTodo_(id)),
});

export default connect(mapState, mapDispatch)(Todos);
