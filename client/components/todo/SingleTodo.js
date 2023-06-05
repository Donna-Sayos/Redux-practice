import React, { useState } from "react";
import {
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
} from "@mui/material";
import { Edit, DeleteForever, Assignment } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const styleProps = {
  input: {
    background: "rgba(223, 227, 238, 0.5)",
  },
  hw: {
    height: "2.3rem",
    width: "2.3rem",
  },
  formLabel: {
    display: "flex",
    justifyContent: "start",
  },
  edit: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "2px solid #fdf5e2",
    padding: "2px",
    backgroundColor: "#a3b899",
    cursor: "pointer",
    fill: "#fdf5e2",
  },
  editChecked: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "2px solid #cbbeb5",
    padding: "2px",
    backgroundColor: "#667b68",
    cursor: "default",
    fill: "#cbbeb5",
  },
  delete: {
    marginLeft: "-20px",
    fill: "#fceee9",
    height: "55px",
    width: "55px",

    "&:hover": {
      fill: "#b88c8c",
      height: "65px",
      width: "65px",
    },
  },
  iconButton: {
    transition: "transform 0.1s ease-in-out",
    "&:hover": {
      backgroundColor: "transparent",
      transform: "rotate(15deg)",
    },
  },
};

const StyledCard = styled(Card)(({ iscompleted }) => ({
  paddingLeft: "10px",
  textAlign: "center",
  backgroundColor: "#e7c6a4",
  position: "relative",
  cursor: "default",
  boxShadow: `
        0px 0px 1px rgb(154,130,98),
        0px 1px 1px rgb(154,130,98),
        0px 2px 1px rgb(154,130,98),

        1px 1px 1px rgb(154,130,98),
        1px 2px 1px rgb(154,130,98),
        1px 3px 1px rgb(154,130,98),

        2px 2px 1px rgb(154,130,98),
        2px 3px 1px rgb(154,130,98),
        2px 4px 1px rgb(154,130,98),

        3px 3px 1px rgb(154,130,98),
        3px 4px 1px rgb(154,130,98),
        3px 5px 1px rgb(154,130,98),

        4px 4px 1px rgb(154,130,98),
        4px 5px 1px rgb(154,130,98),
        4px 6px 1px rgb(154,130,98)`,

  "&&": {
    ...(iscompleted === "true" && {
      textAlign: "center",
      backgroundColor: "#b38b67",
    }),
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    marginTop: "40px",
    color: "#8b6914",
    borderColor: "#dfc4a8",
    boxShadow: `
    0px 0px 1px rgb(154,130,98),
    0px 1px 1px rgb(154,130,98),
    0px 2px 1px rgb(154,130,98),
    
    1px 1px 1px rgb(154,130,98),
    1px 2px 1px rgb(154,130,98),
    1px 3px 1px rgb(154,130,98),
    
    2px 2px 1px rgb(154,130,98),
    2px 3px 1px rgb(154,130,98),
    2px 4px 1px rgb(154,130,98)`,
  },
  "& .css-ihdtdm span": {
    display: "none",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#be9b7b",
    borderWidth: "3px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#be9b7b",
    borderWidth: "3px",
  },
});

const StyledButton = styled(Button)({
  color: "#c98276",
  border: "1px solid #a39193",
  padding: "10px",
  backgroundColor: "#e0a899",
  "&:hover": {
    fontSize: "1rem",
    border: "3px solid #a39193",
    backgroundColor: "#e0a899",
  },
});

const StyledCheckbox = styled(Checkbox)(({ ischecked }) => ({
  "& .MuiSvgIcon-root": { // selecting this class allows to add styling to the checkbox icon
    fontSize: 30,
    fill: "#b38b67",
    cursor: "pointer",
    boxShadow: `
      0px 0px 1px rgb(179,139,103),
      0px 1px 1px rgb(179,139,103),
      0px 2px 1px rgb(179,139,103),

      1px 1px 1px rgb(179,139,103),
      1px 2px 1px rgb(179,139,103),
      1px 3px 1px rgb(179,139,103),

      2px 2px 1px rgb(179,139,103),
      2px 3px 1px rgb(179,139,103),
      2px 4px 1px rgb(179,139,103),

      3px 3px 1px rgb(179,139,103),
      3px 4px 1px rgb(179,139,103),
      3px 5px 1px rgb(179,139,103)`,
  },

  "&&": {
    ...(ischecked === "true" && {
      "& .MuiSvgIcon-root": {
        fill: "#d9b380",
      },
    }),
  },
}));

const StyledH2 = styled("h2")(({ iscompleted }) => ({
  textAlign: "left",
  fontSize: "2rem",
  textShadow: `
      0px 0px 1px rgb(179,139,103),
      0px 1px 1px rgb(179,139,103),
      0px 2px 1px rgb(179,139,103),

      1px 1px 1px rgb(179,139,103),
      1px 2px 1px rgb(179,139,103),
      1px 3px 1px rgb(179,139,103),

      2px 2px 1px rgb(179,139,103),
      2px 3px 1px rgb(179,139,103),
      2px 4px 1px rgb(179,139,103)`,

  "&&": {
    ...(iscompleted === "true" && {
      textDecoration: "line-through",
      textShadow: "none",
      color: "#d9b380",
      fontStyle: "italic",
    }),
  },
}));

export default function SingleTodo({
  todo,
  toggleTodo,
  removeTodo,
  fetchTodos,
  updateTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(todo.description);

  const saveHandler = async (todo) => {
    await updateTodo(todo.id, { ...todo, description: newDescription });
    await fetchTodos();
    
    setIsEditing(false);
  };

  const deleteHandler = async (id) => {
    await removeTodo(id);
    await fetchTodos();
  };

  return (
    <>
      <Grid item xs={8} sm={6}>
        <StyledCard iscompleted={`${todo.isCompleted}`}>
          {isEditing ? (
            <>
              <StyledTextField
                variant="outlined"
                multiline={true}
                inputRef={(input) => input && input.focus()}
                onFocus={(e) => {
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                  );
                }}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                InputProps={{
                  className: `${styleProps.input}`,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Assignment sx={styleProps.hw} />{" "}
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                <StyledButton
                  sx={{ marginRight: "3rem" }}
                  onClick={() => saveHandler(todo)}
                >
                  Save
                </StyledButton>

                <StyledButton onClick={() => setIsEditing(false)}>
                  Cancel
                </StyledButton>
              </div>
            </>
          ) : (
            <FormControlLabel
              sx={styleProps.formLabel}
              control={
                <StyledCheckbox
                  ischecked={`${todo.isCompleted}`}
                  onChange={() => toggleTodo(todo.id)}
                  checked={todo.isCompleted}
                />
              }
              label={
                <StyledH2 iscompleted={`${todo.isCompleted}`}>
                  {todo.description}
                </StyledH2>
              }
            />
          )}
          <Edit
            sx={todo.isCompleted ? styleProps.editChecked : styleProps.edit}
            onClick={() => {
              if (!todo.isCompleted) setIsEditing(true);
            }}
          />
        </StyledCard>
      </Grid>
      <Grid item xs={8} sm={1}>
        <IconButton
          sx={styleProps.iconButton}
          onClick={() => deleteHandler(todo.id)}
        >
          <DeleteForever sx={styleProps.delete} />
        </IconButton>
      </Grid>
    </>
  );
}
