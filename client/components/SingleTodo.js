import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as thunks from "../store/actions/thunks";

function SingleTodo() {
  return <div>SingleTodo</div>;
}

const mapDispatch = (dispatch) => ({
  addTodo: (todo) => dispatch(thunks.addTodo_(todo)),
});

export default connect(null, mapDispatch)(SingleTodo);
