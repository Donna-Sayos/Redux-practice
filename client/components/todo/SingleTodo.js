import React, { useState } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
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
    backgroundColor: "#cdaa7d",
    position: "relative",
    cursor: "default",
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
        3px 5px 1px rgb(179,139,103),

        4px 4px 1px rgb(179,139,103),
        4px 5px 1px rgb(179,139,103),
        4px 6px 1px rgb(179,139,103)`,
  },
  cardChecked: {
    padding: "0px",
    textAlign: "center",
    backgroundColor: "#726255",
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
    fontSize: "1.7rem",
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
    color: "#967259",
    fontStyle: "italic",
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 30,
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
      fill: "#967259",
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
    border: "2px solid white",
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
    border: "2px solid #a39193",
    padding: "2px",
    backgroundColor: "#777777",
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

function SingleTodo({ todo, toggleTodo, removeTodo, fetchTodos, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [hover, setHover] = useState(false);
  const cssClasses = styles();

  const saveHandler = () => {
    updateTodo(todo.id, { ...todo, description: newDescription });
    fetchTodos();
    setIsEditing(false);
  };

  const deleteHandler = (id) => {
    removeTodo(id);
    fetchTodos();
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
            style={todo.isCompleted ? { fill: "#be9b7b" } : { fill: "white" }}
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
            style={{
              fill: hover ? "#ff7878" : "#f6d9d5",
              height: hover ? "65px" : "55px",
              width: hover ? "65px" : "55px",
            }}
          />
        </IconButton>
      </Grid>
    </>
  );
}

const mapDispatch = (dispatch) => ({
  toggleTodo: (id) => dispatch(thunks.toggleTodo_(id)),
  removeTodo: (id) => dispatch(thunks.removeTodo_(id)),
  updateTodo: (id, todo) => dispatch(thunks.updateTodo_(id, todo)),
});

export default connect(null, mapDispatch)(SingleTodo);
