import React, { useEffect, useState, useMemo, useCallback } from "react";
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
    marginTop: "3rem",
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
    textTransform: "none",
    "& .MuiButton-label": {
      fontSize: "2.5rem",
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
  },
  activeOptions: {
    textTransform: "uppercase",
    "& .MuiButton-label": {
      color: "#ddfffc",
      textDecoration: "underline",
      textUnderlineOffset: "0.4em",
      fontSize: "2.5rem",
      textShadow: `
        0px 0px 1px rgb(57,109,124),
        0px 1px 1px rgb(57,109,124),
        0px 2px 1px rgb(57,109,124),

        1px 1px 1px rgb(57,109,124),
        1px 2px 1px rgb(57,109,124),
        1px 3px 1px rgb(57,109,124),

        2px 2px 1px rgb(57,109,124),
        2px 3px 1px rgb(57,109,124),
        2px 4px 1px rgb(57,109,124)`,
    },
  },
  divider: {
    borderBottom: "2px solid #99aab5",
  },
  clear: {
    backgroundColor: "#a3c1ad",
    borderRadius: 5,
    border: "1px solid #008080",
    height: "3rem",
    width: "7.5rem",
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
      2px 4px 1px rgb(73,121,107)`,
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
    },
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0px 2px 0px #3e8e41, 0px 5px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#e2ffec",
      "& .MuiButton-label": {
        color: "#baf2ef",
      },
    },
  },
}));

function Todos({ todos, fetchTodos, clearTodos }) {
  const [todoList, setTodoList] = useState([]);
  const [filterOptions, setFilterOptions] = useState("all");
  // const [isLoading, setIsLoading] = useState(false); // TODO: will add after todos filtering is done
  const cssClasses = styles();

  const sortedTodos = useMemo(() => {
    if (todos && todos.length > 0) {
      return [...todos].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    return [];
  }, [todos]);

  const sortedIncompleteTodos = useMemo(() => {
    if (todos && todos.length > 0) {
      return [...todos]
        .filter((todo) => !todo.isCompleted)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return [];
  }, [todos]);

  const sortedCompletedTodos = useMemo(() => {
    if (todos && todos.length > 0) {
      return [...todos]
        .filter((todo) => todo.isCompleted)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return [];
  }, [todos]);

  const handleAll = useCallback(() => {
    setFilterOptions("all");
    setTodoList(sortedTodos);
  }, [sortedTodos]);

  const handleIncomplete = useCallback(() => {
    setFilterOptions("incomplete");
    setTodoList(sortedIncompleteTodos);
  }, [sortedIncompleteTodos]);

  const handleCompleted = useCallback(() => {
    setFilterOptions("completed");
    setTodoList(sortedCompletedTodos);
  }, [sortedCompletedTodos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos) {
      setTodoList(sortedTodos);
    }
  }, [todos, sortedTodos]);

  return (
    <Container>
      <div>
        <h1 className={cssClasses.header}>TODO List</h1>
      </div>
      <AddTodo />
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <Button
            className={`${cssClasses.options} ${
              filterOptions === "all" && cssClasses.activeOptions
            }`}
            onClick={() => handleAll()}
          >
            All
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={`${cssClasses.options} ${
              filterOptions === "incomplete" && cssClasses.activeOptions
            }`}
            onClick={() => handleIncomplete()}
          >
            Incomplete
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={`${cssClasses.options} ${
              filterOptions === "completed" && cssClasses.activeOptions
            }`}
            onClick={() => handleCompleted()}
          >
            Completed
          </Button>
        </Grid>
        <Grid item>
          <Button className={cssClasses.clear} onClick={() => clearTodos()}>
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
