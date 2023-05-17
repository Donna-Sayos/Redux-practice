const pgPool = require("../db/index");
const QUERIES = require("../db/queries/todoQueries");

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await pgPool.query(QUERIES.getAllTodos_);

    res.status(200).json(todos.rows);
  } catch (err) {
    console.error(`Error in getAllTodos: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "getAllTodos"`,
    });
  }
};

const addTodo = async (req, res, next) => {
  try {
    const description = req.body.description;
    const newTodo = await pgPool.query(QUERIES.addTodo_, [description]);

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.error(`Error in addTodo: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "addTodo"`,
    });
  }
};

const removeTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    await pgPool.query(QUERIES.removeTodo_, [todoId]);

    res.sendStatus(200);
  } catch (err) {
    console.error(`Error in removeTodo: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "removeTodo"`,
    });
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const description = req.body.description;
    const todoToBeUpdated = await pgPool.query(QUERIES.updateTodo_, [
      description,
      todoId,
    ]);

    res.status(200).json(todoToBeUpdated.rows[0]);
  } catch (err) {
    console.error(`Error in updateTodo: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "updateTodo"`,
    });
  }
};

const toggleTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const todoToBeToggled = await pgPool.query(QUERIES.toggleTodo_, [todoId]);

    res.status(200).json(todoToBeToggled.rows[0]);
  } catch (err) {
    console.error(`Error in toggleTodo: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "toggleTodo"`,
    });
  }
};

const clearAllTodos = async (req, res, next) => {
  try {
    await pgPool.query(QUERIES.clearAllTodos_);

    res.sendStatus(200);
  } catch (err) {
    console.error(`Error in clearAllTodos: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "clearAllTodos"`,
    });
  }
};

module.exports = {
  getAllTodos,
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodo,
  clearAllTodos,
};
