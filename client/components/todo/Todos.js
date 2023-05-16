import React, { useEffect, useState, useMemo, useCallback } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import AddTodo from "./AddTodo";
import SingleTodo from "./SingleTodo";
import ProgressWithLabel from "../common/ProgressWithLabel";
import { Button, Grid, Container, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  header: {
    fontSize: "4rem",
    marginTop: "3rem",
    textShadow: `
      0px 0px 1px rgb(179,139,103),
      0px 1px 1px rgb(179,139,103),
      0px 2px 1px rgb(179,139,103),
stylesstyles
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
      color: "#ddfffc",
      textShadow: `
        0px 0px 1px rgb(140,171,168), 
        0px 1px 1px rgb(140,171,168),
        0px 2px 1px rgb(140,171,168),

        1px 1px 1px rgb(140,171,168),
        1px 2px 1px rgb(140,171,168),
        1px 3px 1px rgb(140,171,168),

        2px 2px 1px rgb(140,171,168),
        2px 3px 1px rgb(140,171,168),
        2px 4px 1px rgb(140,171,168)`,
    },
  },
  activeOptions: {
    textTransform: "uppercase",
    "& .MuiButton-label": {
      color: "#daffe7",
      textDecoration: "underline",
      textDecorationColor: "#5f9ea0",
      textUnderlineOffset: "0.5em",
      fontSize: "2.5rem",
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
  divider: {
    borderBottom: "2px solid #99aab5",
  },
  clear: {
    backgroundColor: "#b8d8be",
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
      0px 0px 1px rgb(57,133,100),
      0px 1px 1px rgb(57,133,100),
      0px 2px 1px rgb(57,133,100),

      1px 1px 1px rgb(57,133,100),
      1px 2px 1px rgb(57,133,100),
      1px 3px 1px rgb(57,133,100),

      2px 2px 1px rgb(57,133,100),
      2px 3px 1px rgb(57,133,100),
      2px 4px 1px rgb(57,133,100)`,
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
    },
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0px 2px 0px #3e8e41, 0px 5px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#e1f7d5",
      "& .MuiButton-label": {
        color: "#fff5ee",
      },
    },
  },
}));

function Todos({ todos, fetchTodos, clearTodos }) {
  const [todoList, setTodoList] = useState([]);
  const [filterOptions, setFilterOptions] = useState("all");
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const cssClasses = styles();

  const getSortedTodos = (todos, isCompleted = null) => {
    try {
      let filteredTodos = todos;

      if (isCompleted !== null) {
        filteredTodos = todos.filter(
          (todo) => todo.isCompleted === isCompleted
        );
      }

      const sortedTodos = [...filteredTodos].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      return sortedTodos;
    } catch (err) {
      console.log(`Error at getSortedTodos: ${err}`);
      return [];
    }
  };

  const sortedTodos = useMemo(() => getSortedTodos(todos), [todos]);
  const sortedIncompleteTodos = useMemo(
    () => getSortedTodos(todos, false),
    [todos]
  );
  const sortedCompletedTodos = useMemo(
    () => getSortedTodos(todos, true),
    [todos]
  );

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
    if (todos && todos.length > 0) {
      setTodoList(sortedTodos);
    }
  }, [todos, sortedTodos]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = (prev + 10) % 110;

        if (nextProgress === 0) {
          clearInterval(timer);
          setIsFinished(true);
        }

        return nextProgress;
      });
    }, 2000); // TODO: original time is 50 milliseconds

    return () => clearInterval(timer);
  }, []);

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
      {todoList.length === 0 && isFinished ? (
        <div style={{ marginTop: "4rem" }}>
          <h1>You have no tasks.</h1>
        </div>
      ) : !isFinished && todoList.length > 0 ? (
        // <div style={{ marginTop: "4rem" }}> // TODO: remove later
          <ProgressWithLabel value={progress} />
        // </div>  // TODO: remove later
      ) : (
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
