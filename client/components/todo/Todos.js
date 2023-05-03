import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import {
  Button,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  FormGroup,
  Container,
} from "@material-ui/core";
import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";

const styles = makeStyles((theme) => ({
  paper: {
    padding: "5px",
    textAlign: "center",
    color: "#faf0e6 !important",
    backgroundColor: "#4a6741 !important",
    maxWidth: "100vw",
    maxHeight: "100vh",
  },
  addText: {
    "& .MuiOutlinedInput-root": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(223, 227, 238, 0.5)",
      borderWidth: "3px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(223, 227, 238, 0.5)",
      borderWidth: "3px",
    },
  },
  input: {
    background: "rgba(223, 227, 238, 0.5)",
  },
  addBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: "lowercase",
    maxHeight: "55px",
    background: "	#fbf7f5",
    fontSize: "1rem",
    "&:hover": {
      background: "#f6e0b5",
    },
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
        <form>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8} sm={6}>
              <TextField
                className={cssClasses.addText}
                InputProps={{ className: cssClasses.input }}
                variant="outlined"
                placeholder="Add a new task"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} sm={1}>
              <Button
                className={cssClasses.addBtn}
                variant="contained"
                fullWidth
                disableElevation
              >
                <AddIcon
                  style={{ height: "30px", width: "30px" }}
                  color="action"
                />
              </Button>
            </Grid>
          </Grid>
        </form>
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
