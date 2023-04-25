const router = require("express").Router();
const controllers = require("../controllers/todoController");

router.get("/", controllers.getAllTodos).post("/", controllers.addTodo);
router.delete("/clear", controllers.clearAllTodos);
router
  .get("/:todoId", controllers.getSingleTodo)
  .put("/:todoId", controllers.updateTodo)
  .delete("/:todoId", controllers.removeTodo);
router.put("/:todoId/toggle", controllers.toggleTodo);

module.exports = router;
