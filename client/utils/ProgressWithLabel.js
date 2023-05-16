import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  circle: {
    "& .MuiCircularProgress-circle": {
      color: "#137a7f",
    },
    "& .MuiCircularProgress-svg": {
      width: "6.5rem",
      height: "6.5rem",
    },
  },
  percent: {
    color: "beige",
  },
}));

export default function ProgressWithLabel(props) {
  // FIXME: needs to fix STYLING
  const { value } = props;
  const cssClasses = styles();

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        className={cssClasses.circle}
        variant="determinate"
        value={value}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 className={cssClasses.percent}>{`${Math.round(value)}%`}</h3>
      </Box>
    </Box>
  );
}
