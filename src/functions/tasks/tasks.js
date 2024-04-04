const { app } = require("@azure/functions");
const taskController = require("../../controllers/tasks.controller");

// Add Task endpoint
app.http("addTask", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "tasks/add",
  handler: taskController.addTask,
});

// Get All Tasks endpoint
app.http("getAllTasks", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "tasks/{teacher_id}",
  handler: taskController.getAllTasks,
});

// Remove Task endpoint
app.http("removeTask", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "tasks/{id}",
  handler: taskController.removeTask,
});
