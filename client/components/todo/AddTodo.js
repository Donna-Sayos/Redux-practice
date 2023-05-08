import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import { Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  addText: {
    "& .MuiOutlinedInput-root": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      color: "#8b6914",
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
    maxHeight: "55px",
    background: "#f6e0b5",
    "&:hover": {
      background: "#d2a56d",
    },
  },
  plus: {
    fontSize: "3.5rem",
    color: "#96613d",
    "&:hover": {
      color: "#f6e0b5",
    },
  },
}));

function AddTodo({ addTodo }) {
  const [todoText, setTodoText] = useState("");
  const cssClasses = styles();

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (todoText) {
      addTodo({
        description: todoText,
      });

      setTodoText("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={8} sm={6}>
          <TextField
            className={cssClasses.addText}
            InputProps={{ className: cssClasses.input }}
            variant="outlined"
            placeholder="Add a new task"
            autoFocus
            fullWidth
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} sm={1}>
          <Button
            className={cssClasses.addBtn}
            variant="contained"
            fullWidth
            disableElevation
            type="submit"
          >
            <b className={cssClasses.plus}>+</b>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

const mapDispatch = (dispatch) => ({
  addTodo: (todo) => dispatch(thunks.addTodo_(todo)),
});

export default connect(null, mapDispatch)(AddTodo);
