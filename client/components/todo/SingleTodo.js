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
} from "@material-ui/core";
import { Edit, DeleteForever, Assignment } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
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
  text: {
    "& .MuiOutlinedInput-root": {
      color: "#8b6914",
      marginTop: "40px",
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
  label: {
    display: "flex",
    justifyContent: "start",
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
  },
  delete: {
    marginLeft: "-20px",
  },
  save: {
    border: "1px solid white",
    backgroundColor: "#bd8966",
    marginRight: "10px",
    "&:hover": {
      fontSize: "1rem",
      border: "4px solid #d39972",
      backgroundColor: "#eea990",
    },
  },
  cancel: {
    border: "1px solid white",
    backgroundColor: "#bd8966",
    marginLeft: "10px",
    "&:hover": {
      fontSize: "1rem",
      border: "4px solid #d39972",
      backgroundColor: "#eea990",
    },
  },
  iconButton: {
    transition: "transform 0.1s ease-in-out",
    "&:hover": {
      backgroundColor: "transparent",
      transform: "rotate(15deg)",
    },
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
  const [hover, setHover] = useState(false);
  const cssClasses = styles();

  const saveHandler = async () => {
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
        <Card
          className={
            todo.isCompleted ? cssClasses.cardChecked : cssClasses.card
          }
        >
          {isEditing ? (
            <div>
              <TextField
                className={cssClasses.text}
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
                  className: cssClasses.input,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Assignment
                        style={{ height: "2.3rem", width: "2.3rem" }}
                      />{" "}
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                <Button className={cssClasses.save} onClick={saveHandler}>
                  Save
                </Button>
                <Button
                  className={cssClasses.cancel}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <FormControlLabel
              className={cssClasses.label}
              control={
                <Checkbox
                  className={
                    todo.isCompleted
                      ? cssClasses.checkboxChecked
                      : cssClasses.checkbox
                  }
                  color="primary"
                  onChange={() => toggleTodo(todo.id)}
                  checked={todo.isCompleted}
                />
              }
              label={
                <h2
                  className={
                    todo.isCompleted
                      ? cssClasses.completedDesc
                      : cssClasses.incompleteDesc
                  }
                >
                  {todo.description}
                </h2>
              }
            />
          )}
          <Edit
            className={
              todo.isCompleted ? cssClasses.editChecked : cssClasses.edit
            }
            sx={todo.isCompleted ? { fill: "#cbbeb5" } : { fill: "#fdf5e2" }}
            onClick={() => {
              if (!todo.isCompleted) setIsEditing(true);
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={8} sm={1}>
        <IconButton
          className={cssClasses.iconButton}
          onClick={() => deleteHandler(todo.id)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <DeleteForever
            className={cssClasses.delete}
            sx={{
              fill: hover ? "#b88c8c" : "#fceee9",
              height: hover ? "65px" : "55px",
              width: hover ? "65px" : "55px",
            }}
          />
        </IconButton>
      </Grid>
    </>
  );
}
