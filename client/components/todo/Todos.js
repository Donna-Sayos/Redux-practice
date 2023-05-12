import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import AddTodo from "./AddTodo";
import SingleTodo from "./SingleTodo";
import {
  Button,
  Grid,
  Container,
  Divider,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  header: {
    fontSize: "4rem",
    textShadow: `
      0px 0px 1px rgb(179,139,103),
      0px 1px 1px rgb(179,139,103),
      0px 2px 1px rgb(179,139,103),

      1px 1px 1px rgb(179,139,103),
      1px 2px 1px rgb(179,139,103),
      1px 3px 1px rgb(179,139,103),

      2px 2px 1px rgb(179,139,103),
      2px 3px 1px rgb(179,139,103),
      2px 4px 1px rgb(179,139,103),

      3px 3px 1px rgb(179,139,103),
      3px 4px 1px rgb(179,139,103),
      3px 5px 1px rgb(179,139,103),

      4px 4px 1px rgb(179,139,103),
      4px 5px 1px rgb(179,139,103),
      4px 6px 1px rgb(179,139,103)`,
  },
  options: {
    color: "#dde6d5",
    textShadow: `
      0px 0px 1px rgb(73,121,107),
      0px 1px 1px rgb(73,121,107),
      0px 2px 1px rgb(73,121,107),

      1px 1px 1px rgb(73,121,107),
      1px 2px 1px rgb(73,121,107),
      1px 3px 1px rgb(73,121,107),

      2px 2px 1px rgb(73,121,107),
      2px 3px 1px rgb(73,121,107),
      2px 4px 1px rgb(73,121,107)`,
  },
  divider: {
    borderBottom: "2px solid #99aab5",
  },
  clear: {
    backgroundColor: "#a3c1ad",
    borderRadius: 5,
    height: "3rem",
    width: "5rem",
    textShadow: `
      0px 0px 1px rgb(102,123,104),
      0px 1px 1px rgb(102,123,104),
      0px 2px 1px rgb(102,123,104),

      1px 1px 1px rgb(102,123,104),
      1px 2px 1px rgb(102,123,104),
      1px 3px 1px rgb(102,123,104)`,
    boxShadow: `
      0px 0px 1px rgb(73,121,107),
      0px 1px 1px rgb(73,121,107),
      0px 2px 1px rgb(73,121,107),

      1px 1px 1px rgb(73,121,107),
      1px 2px 1px rgb(73,121,107),
      1px 3px 1px rgb(73,121,107),

      2px 2px 1px rgb(73,121,107),
      2px 3px 1px rgb(73,121,107),
      2px 4px 1px rgb(73,121,107),

      3px 3px 1px rgb(73,121,107),
      3px 4px 1px rgb(73,121,107),
      3px 5px 1px rgb(73,121,107)`,
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0px 2px 0px #3e8e41, 0px 5px 5px rgba(0, 0, 0, 0.1)",
    },
  },
}));

function Todos({ todos, fetchTodos }) {
  const [todoList, setTodoList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false); // TODO: will add after todos filtering is done
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
        <h1 className={cssClasses.header}>TODO List</h1>
      </div>
      <AddTodo />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={8} sm={2}>
          <h1 className={cssClasses.options}>All</h1>
        </Grid>
        <Grid item xs={8} sm={2}>
          <h1 className={cssClasses.options}>Incomplete</h1>
        </Grid>
        <Grid item xs={8} sm={2}>
          <h1 className={cssClasses.options}>Completed</h1>
        </Grid>
        <Grid item xs={8} sm={2}>
          <Button className={cssClasses.clear} variant="contained">
            CLEAR
          </Button>
        </Grid>
      </Grid>
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
