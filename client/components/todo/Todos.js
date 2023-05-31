import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import AddTodo from "./AddTodo";
import SingleTodo from "./SingleTodo";
import ProgressWithLabel from "../common/ProgressWithLabel";
import { Button, Grid, Container, Divider, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Redo, Undo } from "@mui/icons-material";

const styleProps = {
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
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fill: "#aa6f73",
    height: "50px",
    width: "50px",

    "&:hover": {
      fill: "#ffb3ba",
      transform: "scale(1.5)",
    },
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};

const StyledButton = styled(Button)(({ buttonfor, filteroptions, option }) => ({
  ///
  ...(buttonfor === "clear" && {
    backgroundColor: "#b8d8be",
    borderRadius: 5,
    border: "1px solid #008080",
    fontSize: "1.6rem",
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

    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0px 2px 0px #3e8e41, 0px 5px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#e1f7d5",
      color: "#fff5ee",
    },
  }),
  ...(buttonfor === "options" && {
    textTransform: "none",
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

    "&&": {
      // styles defined within "&&" will take precedence over the default styles of MUI components
      ...(filteroptions === option && {
        // custom attributes cannot be camelCased in styled components. Must be "lowercase"
        // "..." is used to merge the objects into the parent object when filteroptions === option;

        textTransform: "uppercase",
        color: "#daffe7",
        textDecoration: "underline",
        textDecorationColor: "#5f9ea0",
        textUnderlineOffset: "0.5em",
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
      }),
    },
  }),
}));

const StyledDivider = styled(Divider)({
  borderBottom: "2px solid #99aab5",
});

function Todos({
  todos,
  fetchTodos,
  addTodo,
  clearTodos,
  updateTodo,
  removeTodo,
  toggleTodo,
  undo,
  redo,
}) {
  const [todoList, setTodoList] = useState([]);
  const [filterOptions, setFilterOptions] = useState("all");
  const [isFinished, setIsFinished] = useState(false);
  const [value, setValue] = useState(0);
  const [showProgress, setShowProgress] = useState(true);

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

  const clearHandler = async () => {
    await clearTodos();
  };

  const undoHandler = async () => { // FIXME: testing feature
    await undo();
    // await fetchTodos();
  };

  const redoHandler = async () => { // FIXME: testing feature
    await redo();
    // await fetchTodos();
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await fetchTodos();

        if (isMounted) {
          setIsFinished(true);
        }
      } catch (err) {
        console.log(`Error at fetchData: ${err}`);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (todos) {
      switch (filterOptions) {
        case "all":
          setTodoList(sortedTodos);
          break;
        case "incomplete":
          setTodoList(sortedIncompleteTodos);
          break;
        case "completed":
          setTodoList(sortedCompletedTodos);
          break;
        default:
          setTodoList(sortedTodos);
      }
    }
  }, [
    todos,
    filterOptions,
    sortedTodos,
    sortedIncompleteTodos,
    sortedCompletedTodos,
  ]);

  useEffect(() => {
    let timer;

    if (isFinished) {
      timer = setInterval(() => {
        setValue((prev) => {
          const nextProgress = (prev + 10) % 110;

          if (nextProgress === 0) {
            clearInterval(timer);
            setShowProgress(false);
          }

          return nextProgress;
        });
      }, 40);
    }

    return () => clearInterval(timer);
  }, [isFinished]);

  return (
    <Container>
      <div>
        <h1 style={styleProps.header}>TODO List</h1>
      </div>
      <AddTodo addTodo={addTodo} />
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <StyledButton
            buttonfor="options"
            filteroptions={filterOptions}
            option="all"
            onClick={() => setFilterOptions("all")}
          >
            All
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            buttonfor="options"
            filteroptions={filterOptions}
            option="incomplete"
            onClick={() => setFilterOptions("incomplete")}
          >
            Incomplete
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            buttonfor="options"
            filteroptions={filterOptions}
            option="completed"
            onClick={() => setFilterOptions("completed")}
          >
            Completed
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton buttonfor="clear" onClick={() => clearHandler()}>
            CLEAR
          </StyledButton>
        </Grid>
      </Grid>
      <StyledDivider variant="fullWidth" />
      <div style={{ margin: 0 }}>
        <IconButton sx={styleProps.iconButton} onClick={() => undoHandler()}>
          <Undo sx={styleProps.icon} />
        </IconButton>
        <IconButton sx={styleProps.iconButton} onClick={() => redoHandler()}>
          <Redo sx={styleProps.icon} />
        </IconButton>
      </div>
      {todoList.length === 0 && isFinished ? (
        <div style={{ marginTop: "4rem" }}>
          <h1>You have no tasks.</h1>
        </div>
      ) : todoList.length > 0 && showProgress ? (
        <div style={styleProps.progressContainer}>
          <ProgressWithLabel value={value} />
        </div>
      ) : (
        <div>
          {todoList.map((todo) => (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              key={todo.id}
            >
              <SingleTodo
                todo={todo}
                fetchTodos={fetchTodos}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                toggleTodo={toggleTodo}
              />
            </Grid>
          ))}
        </div>
      )}
    </Container>
  );
}

const mapState = (state) => ({
  todos: state.todos.present,
});

const mapDispatch = (dispatch) => ({
  fetchTodos: () => dispatch(thunks.fetchTodos_()),
  addTodo: (todo) => dispatch(thunks.addTodo_(todo)),
  clearTodos: () => dispatch(thunks.clearTodos_()),
  removeTodo: (id) => dispatch(thunks.removeTodo_(id)),
  updateTodo: (id, todo) => dispatch(thunks.updateTodo_(id, todo)),
  toggleTodo: (id) => dispatch(thunks.toggleTodo_(id)),

  undo: () => dispatch(thunks.undo_()), // FIXME: testing feature
  redo: () => dispatch(thunks.redo_()), // FIXME: testing feature
});

export default connect(mapState, mapDispatch)(Todos);
