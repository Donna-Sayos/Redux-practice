import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; // FIXME: to add styles here...
import { CssBaseline } from "@material-ui/core"; // FIXME: to add styles here...

function AddTodo() {
  return <div>AddTodo</div>;
}

const mapDispatch = (dispatch) => ({
  addTodo: (todo) => dispatch(thunks.addTodo_(todo)),
});

export default connect(null, mapDispatch)(AddTodo);
