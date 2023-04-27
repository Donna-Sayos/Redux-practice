import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../../store/actions/thunks";
import { Button } from '@material-ui/core';

function AddTodo() {
  return <div>AddTodo</div>;
}

const mapDispatch = (dispatch) => ({
  addTodo: (todo) => dispatch(thunks.addTodo_(todo)),
});

export default connect(null, mapDispatch)(AddTodo);
