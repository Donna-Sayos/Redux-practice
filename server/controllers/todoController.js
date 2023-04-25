const pgPool = require("../db/index");
const QUERIES = require("../db/queries/todoQueries");

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await pgPool.query(QUERIES.getAllTodos_);
    const noTodosFound = todos.rows.length === 0;

    if (noTodosFound) {
      return res.status(404).json({
        success: false,
        message: "No todos found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: todos.rows,
      });
    }
  } catch (err) {
    console.error(`Error in getAllTodos: ${err}`);
    res.status(500).send(`Internal Server Error at "getAllTodos"`);
  }
};

const getSingleTodo = async (req, res, next) => {
  let todoId;
  try {
    todoId = parseInt(req.params.todoId);
    const todo = await pgPool(QUERIES.getTodoByID_, [todoId]);
    const todoNotFound = todo.rows.length === 0;

    if (todoNotFound) {
      return res.status(404).json({
        success: "false",
        message: `TODO with id ${todoId} not found`,
      });
    } else {
      return res.status(200).json({
        success: "true",
        data: todo.rows[0],
      });
    }
  } catch (err) {
    console.error(`Error in getSingleTodo: ${err}`);
    res.status(500).send(`Internal Server Error at "getSingleTodo"`);
  }
};

module.exports = {
  getAllTodos,
  getSingleTodo,
};
