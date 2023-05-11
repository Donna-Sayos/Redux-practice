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
import { transform } from "lodash";

const styles = makeStyles((theme) => ({
  card: {
    padding: "0px",
    textAlign: "center",
    backgroundColor: "#c89f73",
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
  },
  completedDesc: {
    textAlign: "left",
    textDecoration: "line-through",
    color: "#d6c7c7",
    fontStyle: "italic",
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 30,
    },
    cursor: "pointer",
    marginLeft: "40px",
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
  const [isCompleted, setIsCompleted] = useState(false);
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
        <Card className={cssClasses.card} raised>
          {isEditing ? (
            <div>
              <TextField
                className={cssClasses.text}
                variant="outlined"
                multiline={true}
                autoFocus
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
                  className={cssClasses.checkbox}
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
            className={cssClasses.edit}
            onClick={() => setIsEditing(true)}
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
              fill: hover ? "#fbe7a1" : "#e4d5b7",
              height: hover ? "70px" : "60px",
              width: hover ? "70px" : "60px",
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
