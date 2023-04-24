const getTodos = "SELECT * FROM todo";
const getTodoByID = "SELECT * FROM todo WHERE id = $1";
const addTodo = "INSERT INTO todo (todo, "