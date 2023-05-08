import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import {
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
} from "@material-ui/core";
import { Edit, Mode, DeleteForever } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  card: {
    padding: "0px",
    textAlign: "center",
    backgroundColor: "#c89f73",
    position: "relative",
    cursor: "default",
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

function SingleTodo({ todo, toggleTodo }) {
  const cssClasses = styles();

  const checkboxHandler = (e, id) => {
    e.preventDefault();
    toggleTodo(id);
  };

  return (
    <>
      <Grid item xs={8} sm={6}>
        <Card className={cssClasses.card} raised>
          <FormControlLabel
            className={cssClasses.desc}
            control={
              <Checkbox
                className={cssClasses.checkbox}
                onChange={(e) => checkboxHandler(e, todo.id)}
              />
            }
            label={<h2>{todo.description}</h2>}
          />
          <Edit className={cssClasses.edit} />
        </Card>
      </Grid>
      <Grid item sm={1}>
        <DeleteForever className={cssClasses.delete} />
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
