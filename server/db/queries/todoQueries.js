const getAllTodos_ = "SELECT * FROM todo";
const getTodoByID_ = "SELECT * FROM todo WHERE id = $1";
const addTodo_ =
  "INSERT INTO todo (description, isCompleted) VALUES ($1, false) RETURNING *";
const removeTodo_ = "DELETE FROM todo WHERE id = $1";
const updateTodo_ =
  "UPDATE todo SET description = $1 WHERE id = $2 RETURNING id, description, isCompleted";
const toggleTodo_ =
  "UPDATE todo SET isCompleted = NOT isCompleted WHERE id = $1 RETURNING id, description, isCompleted";

module.exports = {
  getAllTodos_,
  getTodoByID_,
  addTodo_,
  removeTodo_,
  updateTodo_,
  toggleTodo_,
};
