import React from "react";
import { connect } from "react-redux";

function Todo() {
  return <div>Todo</div>;
}

const mapStateToProps = (state) => ({
  todo: state.todo,
  isCompleted: state.isCompleted,
});



export default Todo;
