const { app } = require("@azure/functions");
const lessonController = require("../../controllers/lessons.controller");

// Add Lesson endpoint
app.http("addLesson", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "lessons/add",
  handler: lessonController.addLesson,
});

// Get All Lessons endpoint
app.http("getAllLessons", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "lessons",
  handler: lessonController.getAllLessons,
});

// Get Lessons by Teacher ID endpoint
app.http("getLessonsByTeacherId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "lessons/teacher/{teacher_id}",
  handler: lessonController.getLessonsByTeacherId,
});

// Remove Lesson endpoint
app.http("removeLesson", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "lessons/{id}",
  handler: lessonController.removeLesson,
});
