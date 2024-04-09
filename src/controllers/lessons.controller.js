// Import required modules
const lessonService = require("../services/lessons.service");

// Controller to add a lesson
const addLesson = async (request, context) => {
  const body = await request.json();

  return await lessonService.addLesson(
    {
      teacher_id: body.teacher_id,
      student_id: body.student_id,
      group_id: body.group_id,
      lesson_mode: body.lesson_mode,
      repeatAt: body.repeatAt,
      description: body.description,
      lesson_date: body.lesson_date,
      lesson_name: body.lesson_name,
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

const getLessonsByTeacherIdAndGroupId = async (request, context) => {
  try {
    // Extract teacher_id and group_id from the request parameters
    const { teacher_id, group_id } = request.params;

    // Call the service function to retrieve lessons
    const response = await lessonService.getLesssonsByTeacherIdandGroupId({
      teacher_id,
      group_id,
    });

    // Return the response
    return response;
  } catch (error) {
    // Return error response
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

// Export the controller functions
module.exports = {
  addLesson,
  getAllLessons,
  getLessonsByTeacherId,
  getLessonsByTeacherIdAndGroupId,
  removeLesson,
};
