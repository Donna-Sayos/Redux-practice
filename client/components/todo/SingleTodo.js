import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
} from "@material-ui/core";
import { Edit, DeleteForever } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";

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
  desc: {
    display: "flex",
    justifyContent: "start",
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
    cursor: "pointer",
  },
}));

function SingleTodo({ todo, toggleTodo, removeTodo, fetchTodos, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(todo.description);
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
                autoFocus
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                InputProps={{
                  className: cssClasses.input,
                }}
              />
              <div>
                <Button onClick={saveHandler}>Save</Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <FormControlLabel
              className={cssClasses.desc}
              control={
                <Checkbox
                  className={cssClasses.checkbox}
                  onChange={() => toggleTodo(todo.id)}
                  checked={todo.isCompleted}
                />
              }
              label={<h2>{todo.description}</h2>}
            />
          )}
          <Edit
            className={cssClasses.edit}
            onClick={() => setIsEditing(true)}
          />
        </Card>
      </Grid>
      <Grid item sm={1}>
        <DeleteForever
          className={cssClasses.delete}
          onClick={() => deleteHandler(todo.id)}
        />
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
