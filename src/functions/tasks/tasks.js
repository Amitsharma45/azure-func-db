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
  handler: taskController.getAllTasksByTeacherId,
});

// Remove Task endpoint
app.http("removeTask", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "tasks/{id}",
  handler: taskController.removeTask,
});

// Get Tasks by Community ID and Group ID endpoint
app.http("getTasksByTeacherAndGroupId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "tasks/teacher/{teacher_id}/group/{group_id}",
  handler: taskController.getTasksByTeacherAndGroupId,
});

// Get Tasks by Community ID and Student ID endpoint
app.http("getTasksByTeacherAndStudentId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "tasks/teacher/{teacher_id}/student/{student_id}",
  handler: taskController.getTasksByTeacherAndStudentId,
});
