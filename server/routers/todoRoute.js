const router = require("express").Router();
const controllers = require("../controllers/todoController");

router.get("/", controllers.getAllTodos);
router.post("/", controllers.addTodo);
router.get("/:todoId", controllers.getSingleTodo);
router.delete("/:todoId", controllers.removeTodo);
router.put("/:todoId", controllers.updateTodo);
router.put("/:todoId/toggle", controllers.toggleTodo);
router.delete("/", controllers.clearAllTodos);

module.exports = router;
