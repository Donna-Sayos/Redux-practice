import React from "react";
import CLIP from "./assets/clip.png";
import Todos from "./components/todo/Todos";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const styleProps = {
  hanger: {
    filter: "contrast(70%)",
    position: "absolute",
    top: "4%",
    top: `calc(${35 * 2}px - 4.5rem)`,
    transform: "translateX(-50%)",
    width: "65%",
    height: "35rem",
    imageRendering: "pixelated",
  },
};

const StyledPaper = styled(Paper)({
  textAlign: "center",
  color: "#faf0e6",
  backgroundColor: "#aec8ce",
  minWidth: "90vw",
  minHeight: "90vh",

  marginTop: "4rem",
  paddingBottom: "2rem",
  border: "1px solid rgb(73,121,107)",
  boxShadow: `
          0px 0px 1px rgb(73,121,107),
          0px 1px 1px rgb(73,121,107),
          0px 2px 1px rgb(73,121,107),

          1px 1px 1px rgb(73,121,107),
          1px 2px 1px rgb(73,121,107),
          1px 3px 1px rgb(73,121,107),

          2px 2px 1px rgb(73,121,107),
          2px 3px 1px rgb(73,121,107),
          2px 4px 1px rgb(73,121,107),

          3px 3px 1px rgb(73,121,107),
          3px 4px 1px rgb(73,121,107),
          3px 5px 1px rgb(73,121,107),
          
          4px 4px 1px rgb(73,121,107),
          4px 5px 1px rgb(73,121,107),
          4px 6px 1px rgb(73,121,107),
          
          5px 5px 1px rgb(73,121,107),
          5px 6px 1px rgb(73,121,107),
          5px 7px 1px rgb(73,121,107),
          
          6px 6px 1px rgb(73,121,107),
          6px 7px 1px rgb(73,121,107),
          6px 8px 1px rgb(73,121,107),
          
          7px 7px 1px rgb(73,121,107),
          7px 8px 1px rgb(73,121,107),
          7px 9px 1px rgb(73,121,107)`,
});

export default function App() {
  return (
    <StyledPaper>
      <img src={CLIP} style={styleProps.hanger} />
      <Todos />
    </StyledPaper>
  );
}
