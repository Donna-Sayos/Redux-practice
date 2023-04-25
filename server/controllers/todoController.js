const pgPool = require("../db/index");
const QUERIES = require("../db/queries/todoQueries");

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await pgPool.query(QUERIES.getAllTodos_);
    const noTodosFound = todos.rows.length === 0;

    if (noTodosFound) {
      return res.status(404).json({
        success: `false`,
        message: "No todos found",
      });
    } else {
      return res.status(200).json({
        success: `true`,
        data: todos.rows,
      });
    }
  } catch (err) {
    console.error(`Error in getAllTodos: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "getAllTodos"`,
    });
  }
};

const getSingleTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const todo = await pgPool.query(QUERIES.getTodoByID_, [todoId]); // [todoId] is the array of values to be inserted into the query
    const todoNotFound = todo.rows.length === 0;

    if (todoNotFound) {
      return res.status(404).json({
        success: `false`,
        message: `TODO with id ${todoId} not found`,
      });
    } else {
      return res.status(200).json({
        success: `true`,
        data: todo.rows[0],
      });
    }
  } catch (err) {
    console.error(`Error in getSingleTodo: ${err}`);
    res.status(500).json({
      success: `false`,
      message: `Internal Server Error at "getSingleTodo"`,
    });
  }
};

const addTodo = async (req, res, next) => {
  try {
    const description = req.body.description;
    const newTodo = await pgPool.query(QUERIES.addTodo_, [description]);
    const todoAdded = newTodo.rows.length > 0;

    if (todoAdded) {
      return res.status(201).json({
        success: `true`,
        data: newTodo.rows[0],
      });
    } else {
      return res.status(400).json({
        success: `false`,
        message: `TODO with description ${description} not added`,
      });
    }
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

    return res.status(200).json({
      success: `true`,
      message: `TODO with id ${todoId} removed`,
    });
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
    const todoUpdated = todoToBeUpdated.rows.length > 0;

    if (todoUpdated) {
      return res.status(200).json({
        success: `true`,
        data: todoToBeUpdated.rows[0],
      });
    } else {
      return res.status(400).json({
        success: `false`,
        message: `TODO with id ${todoId} not updated`,
      });
    }
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
    const todoToggled = todoToBeToggled.rows.length > 0;

    if (todoToggled) {
      return res.status(200).json({
        success: `true`,
        data: todoToBeToggled.rows[0],
      });
    } else {
      return res.status(400).json({
        success: `false`,
        message: `TODO with id ${todoId} not toggled`,
      });
    }
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

    return res.status(200).json({
      success: `true`,
      message: `All todos cleared`,
    });
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
  getSingleTodo,
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodo,
  clearAllTodos,
};
