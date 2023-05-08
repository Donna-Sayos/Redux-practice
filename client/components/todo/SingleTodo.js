import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import { Button, IconButton, Checkbox, Grid, Card } from "@material-ui/core";
import { ExpandCircleDown, Mode, DeleteForever } from "@mui/icons-material"
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  card: {
    padding: "5px",
    textAlign: "center",
    backgroundColor: "#c89f73",
  },
}));

function SingleTodo({ todo }) {
  const cssClasses = styles();
  return (
    <Grid item xs={8} sm={6}>
      <Card className={cssClasses.card} raised>
        <h2>{todo.description}</h2>
      </Card>
    </Grid>
  );
}

const mapDispatch = (dispatch) => ({
  toggleTodo: (id) => dispatch(thunks.toggleTodo_(id)),
  removeTodo: (id) => dispatch(thunks.removeTodo_(id)),
  updateTodo: (id, todo) => dispatch(thunks.updateTodo_(id, todo)),
});

export default connect(null, mapDispatch)(SingleTodo);
