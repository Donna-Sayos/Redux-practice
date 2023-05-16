import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  boxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20rem",
    height: "20rem",
  },
  circle: {
    "& .MuiCircularProgress-circle": {
      color: "#137a7f",
    },
    "& .MuiCircularProgress-svg": {
      width: "10rem",
      height: "10rem",
      display: "block",
      margin: "-0.2rem -3.8rem",
    },
  },
  boxPercent: {
    position: "relative",
    left: "-2.2rem",
    top: "0.1rem",
    width: "5rem",
    height: "5rem",
  },
  percent: {
    color: "beige",
    margin: "1.5rem auto",
  },
}));

export default function ProgressWithLabel(props) {
  // FIXME: needs to fix STYLING
  const { value } = props;
  const cssClasses = styles();

  return (
    <Box className={cssClasses.boxContainer}>
      <CircularProgress
        className={cssClasses.circle}
        variant="determinate"
        value={value}
        thickness={4.5}
      />

      <Box className={cssClasses.boxPercent}>
        <h2 className={cssClasses.percent}>{`${Math.round(value)}%`}</h2>
      </Box>
    </Box>
  );
}
