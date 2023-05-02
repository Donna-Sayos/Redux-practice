import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";

import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";

function AddTodo() {
  return <div>AddTodo</div>;
}

const mapDispatch = (dispatch) => ({
  addTodo: (todo) => dispatch(thunks.AddTodo_(todo)),
});

export default connect(null, mapDispatch)(AddTodo);
