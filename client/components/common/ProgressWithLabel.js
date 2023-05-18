import React from "react";
import { CircularProgress, Box } from "@mui/material";

const styleProps = {
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
};

export default function ProgressWithLabel(props) {
  const { value } = props;

  return (
    <Box sx={styleProps.boxContainer}>
      <CircularProgress
        sx={styleProps.circle}
        variant="determinate"
        value={value}
        thickness={4.5}
      />

      <Box sx={styleProps.boxPercent}>
        <h2 style={styleProps.percent}>{`${Math.round(value)}%`}</h2>
      </Box>
    </Box>
  );
}
