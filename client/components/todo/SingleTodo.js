import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import {
  Button,
  IconButton,
  Checkbox,
  Grid,
  Box,
  Card,
} from "@material-ui/core";

function SingleTodo({ todo }) {
  return (
    <Grid item xs={8} sm={6}>
      <Card>
        <p>{todo.description}</p>
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
