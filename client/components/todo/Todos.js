import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import AddTodo from "./AddTodo";
import SingleTodo from "./SingleTodo";
import { Button, Grid, Container, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  divider: {
    borderBottom: "2px solid #99aab5",
  },
}));

function Todos({ todos, fetchTodos }) {
  const [todoList, setTodoList] = useState([]);
  const cssClasses = styles();

  const sortedTodos = useMemo(() => {
    if (todos) {
      return [...todos].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
  }, [todos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos) {
      setTodoList(sortedTodos);
    }
  }, [todos]);

  console.log("todoList", todoList); // TODO: remove later

  return (
    <Container maxWidth="lg">
      <div>
        <h1>TODO List</h1>
      </div>
      <AddTodo />
      <Divider className={cssClasses.divider} variant="fullWidth" />
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
