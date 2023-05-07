import React from "react";
import Todos from "./components/todo/Todos";
import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  paper: {
    padding: "5px",
    textAlign: "center",
    color: "#faf0e6 !important",
    backgroundColor: "#4a6741 !important",
    minWidth: "90vw",
    minHeight: "90vh",
  },
}));

export default function App() {
  const cssClasses = styles();

  return (
    <Paper className={cssClasses.paper} elevation={9} square>
      <Todos />
    </Paper>
  );
}
