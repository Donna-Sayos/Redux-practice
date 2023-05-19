import React, { useState } from "react";
import { Button, TextField, Grid, InputAdornment } from "@mui/material";
import { Assignment } from "@mui/icons-material/";
import { styled } from "@mui/material/styles";

const styleProps = {
  input: {
    background: "rgba(223, 227, 238, 0.5)",
  },
  hw: {
    height: "2.3rem",
    width: "2.3rem",
  },
};

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    color: "#8b6914",
    height: "3.83rem",
    boxShadow: `
      0px 0px 1px rgb(140,171,168),
      0px 1px 1px rgb(140,171,168),
      0px 2px 1px rgb(140,171,168),

      0px 1px 1px rgb(140,171,168),
      0px 2px 1px rgb(140,171,168),
      0px 3px 1px rgb(140,171,168),

      0px 2px 1px rgb(140,171,168),
      0px 3px 1px rgb(140,171,168),
      0px 4px 1px rgb(140,171,168)`,
  },
  "& .css-ihdtdm span": {
    display: "none",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(223, 227, 238, 0.5)",
    borderWidth: "3px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(223, 227, 238, 0.5)",
    borderWidth: "3px",
  },
});

const AddButton = styled(Button)({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  height: "4.4rem",
  background: "#f6e0b5",
  fontSize: "3.5rem",
  color: "#96613d",
  boxShadow: `
        0px 0px 1px rgb(219,193,172),
        0px 1px 1px rgb(219,193,172),
        0px 2px 1px rgb(219,193,172),

        1px 1px 1px rgb(219,193,172),
        1px 2px 1px rgb(219,193,172),
        1px 3px 1px rgb(219,193,172),

        2px 2px 1px rgb(219,193,172),
        2px 3px 1px rgb(219,193,172),
        2px 4px 1px rgb(219,193,172)`,
  "&:hover": {
    background: "#d2a56d",
    color: "#f6e0b5",
  },
});

export default function AddTodo({ addTodo }) {
  const [todoText, setTodoText] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (todoText) {
      const capitalizedTodoText =
        todoText.charAt(0).toUpperCase() + todoText.slice(1);

      await addTodo({
        description: capitalizedTodoText,
      });

      setTodoText("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={8} sm={6}>
          <StyledTextField
            variant="outlined"
            placeholder="Add a new task"
            multiline={true}
            autoFocus
            fullWidth
            value={todoText}
            InputProps={{
              className: `${styleProps.input}`,
              startAdornment: (
                <InputAdornment position="start">
                  <Assignment sx={styleProps.hw} />{" "}
                </InputAdornment>
              ),
            }}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </Grid>
        <Grid item xs={8} sm={1}>
          <AddButton fullWidth type="submit">
            +
          </AddButton>
        </Grid>
      </Grid>
    </form>
  );
}
