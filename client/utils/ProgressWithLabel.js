import React from "react";
import { Typography, CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  circle: {
    "& .MuiCircularProgress-circle": {
      color: "red",
    },
  },
}));

export default function ProgressWithLabel(props) {
  // FIXME: needs to fix STYLING
  const { value } = props;
  const cssClasses = styles();

  return (
    <Box>
      <CircularProgress
        className={cssClasses.circle}
        variant="determinate"stylesstyles
        value={value}
        color="primary"
      />
      <div
        style={{
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
