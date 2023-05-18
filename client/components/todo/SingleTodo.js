import React, { useState } from "react";
import {
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
} from "@mui/material";
import { Edit, DeleteForever, Assignment } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const styleProps = {
  card: {
    padding: "0px",
    textAlign: "center",
    backgroundColor: "#e7c6a4",
    position: "relative",
    cursor: "default",
    boxShadow: `
        0px 0px 1px rgb(154,130,98),
        0px 1px 1px rgb(154,130,98),
        0px 2px 1px rgb(154,130,98),

        1px 1px 1px rgb(154,130,98),
        1px 2px 1px rgb(154,130,98),
        1px 3px 1px rgb(154,130,98),

        2px 2px 1px rgb(154,130,98),
        2px 3px 1px rgb(154,130,98),
        2px 4px 1px rgb(154,130,98),

        3px 3px 1px rgb(154,130,98),
        3px 4px 1px rgb(154,130,98),
        3px 5px 1px rgb(154,130,98),

        4px 4px 1px rgb(154,130,98),
        4px 5px 1px rgb(154,130,98),
        4px 6px 1px rgb(154,130,98)`,
  },
  cardChecked: {
    padding: "0px",
    textAlign: "center",
    backgroundColor: "#b38b67",
    position: "relative",
    cursor: "default",
  },
  input: {
    background: "rgba(223, 227, 238, 0.5)",
  },
  label: {
    display: "flex",
    justifyContent: "start",
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 30,
      fill: "#b38b67",
      boxShadow: `
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
        3px 5px 1px rgb(179,139,103)`,
    },
    cursor: "pointer",
  },
  checkboxChecked: {
    "& .MuiSvgIcon-root": {
      fontSize: 30,
      fill: "#d9b380",
    },
    cursor: "pointer",
  },
  incompleteDesc: {
    textAlign: "left",
    fontSize: "2rem",
    textShadow: `
      0px 0px 1px rgb(179,139,103),
      0px 1px 1px rgb(179,139,103),
      0px 2px 1px rgb(179,139,103),

      1px 1px 1px rgb(179,139,103),
      1px 2px 1px rgb(179,139,103),
      1px 3px 1px rgb(179,139,103),

      2px 2px 1px rgb(179,139,103),
      2px 3px 1px rgb(179,139,103),
      2px 4px 1px rgb(179,139,103)`,
  },
  completedDesc: {
    textAlign: "left",
    textDecoration: "line-through",
    color: "#d9b380",
    fontStyle: "italic",
  },
  edit: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "2px solid #fdf5e2",
    padding: "2px",
    backgroundColor: "#a3b899",
    cursor: "pointer",
    fill: "#fdf5e2",
  },
  editChecked: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "2px solid #cbbeb5",
    padding: "2px",
    backgroundColor: "#667b68",
    cursor: "default",
    fill: "#cbbeb5",
  },
  delete: {
    marginLeft: "-20px",
    fill: "#fceee9",
    height: "55px",
    width: "55px",

    "&:hover": {
      fill: "#b88c8c",
      height: "65px",
      width: "65px",
    },
  },
  iconButton: {
    transition: "transform 0.1s ease-in-out",
    "&:hover": {
      backgroundColor: "transparent",
      transform: "rotate(15deg)",
    },
  },
  hw: {
    height: "2.3rem",
    width: "2.3rem",
  },
};

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#8b6914",
    marginTop: "40px",
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
  "& .MuiOutlinedInput-root .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(223, 227, 238, 0.5)",
    borderWidth: "3px",
  },
});

const SaveButton = styled(Button)(() => ({
  border: "1px solid white",
  backgroundColor: "#bd8966",
  marginRight: "10px",
  "&:hover": {
    fontSize: "1rem",
    border: "4px solid #d39972",
    backgroundColor: "#eea990",
  },
}));

const CancelButton = styled(Button)(() => ({
  border: "1px solid white",
  backgroundColor: "#bd8966",
  marginLeft: "10px",
  "&:hover": {
    fontSize: "1rem",
    border: "4px solid #d39972",
    backgroundColor: "#eea990",
  },
}));

export default function SingleTodo({
  todo,
  toggleTodo,
  removeTodo,
  fetchTodos,
  updateTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(todo.description);

  const saveHandler = async (todo) => {
    await updateTodo(todo.id, { ...todo, description: newDescription });
    await fetchTodos();
    setIsEditing(false);
  };

  const deleteHandler = async (id) => {
    await removeTodo(id);
    await fetchTodos();
  };

  return (
    <>
      <Grid item xs={8} sm={6}>
        <Card sx={todo.isCompleted ? styleProps.cardChecked : styleProps.card}>
          {isEditing ? (
            <div>
              <StyledTextField
                variant="outlined"
                multiline={true}
                inputRef={(input) => input && input.focus()}
                onFocus={(e) => {
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                  );
                }}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                InputProps={{
                  className: `${styleProps.input}`,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Assignment sx={styleProps.hw} />{" "}
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                <SaveButton onClick={() => saveHandler(todo)}>Save</SaveButton>
                <CancelButton onClick={() => setIsEditing(false)}>
                  Cancel
                </CancelButton>
              </div>
            </div>
          ) : (
            <FormControlLabel
              sx={styleProps.label}
              control={
                <Checkbox
                  sx={
                    todo.isCompleted
                      ? styleProps.checkboxChecked
                      : styleProps.checkbox
                  }
                  color="primary"
                  onChange={() => toggleTodo(todo.id)}
                  checked={todo.isCompleted}
                />
              }
              label={
                <h2
                  style={
                    todo.isCompleted
                      ? styleProps.completedDesc
                      : styleProps.incompleteDesc
                  }
                >
                  {todo.description}
                </h2>
              }
            />
          )}
          <Edit
            sx={todo.isCompleted ? styleProps.editChecked : styleProps.edit}
            onClick={() => {
              if (!todo.isCompleted) setIsEditing(true);
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={8} sm={1}>
        <IconButton
          sx={styleProps.iconButton}
          onClick={() => deleteHandler(todo.id)}
        >
          <DeleteForever sx={styleProps.delete} />
        </IconButton>
      </Grid>
    </>
  );
}
