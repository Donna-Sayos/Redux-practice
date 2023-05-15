import React from "react";
import { Typography, CircularProgress, Box } from "@material-ui/core";

export default function ProgressWithLabel(props) { // FIXME: needs to fix STYLING
  const { value } = props;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} />
      <div
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(value)}%`}</Typography>
      </div>
    </Box>
  );
}
