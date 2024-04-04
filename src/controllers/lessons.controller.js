// Import required modules
const lessonService = require("../services/lessons.service");

// Controller to add a lesson
const addLesson = async (request, context) => {
  const body = await request.json();

  return await lessonService.addLesson(
    {
      teacher_id: body.teacher_id,
      lesson_date: body.lesson_date,
      lesson_name: body.lesson_name,
      status: body.status,
    },
    context
  );
};

// Controller to get all lessons
const getAllLessons = async (request, context) => {
  return await lessonService.getAllLessons(request, context);
};

// Controller to get lessons by teacher ID
const getLessonsByTeacherId = async (request, context) => {
  return await lessonService.getLessonsByTeacherId(request, context);
};

// Controller to remove a lesson
const removeLesson = async (request, context) => {
  return await lessonService.removeLesson(request, context);
};

// Export the controller functions
module.exports = {
  addLesson,
  getAllLessons,
  getLessonsByTeacherId,
  removeLesson,
};
