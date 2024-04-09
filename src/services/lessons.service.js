const db = require("../config/db.config");
const connection = db.getConnection();

const DataTypes = require("sequelize/lib/data-types");

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

// Add a new lesson
const addLesson = async (request, context) => {
  try {
    // Extract required fields from the request
    const {
      teacher_id,
      student_id,
      group_id,
      lesson_name,
      lesson_date,
      lesson_mode,
      repeatAt,
      description,
    } = request;

    const formattedLessonDate = new Date(lesson_date).toISOString();

    // Create the lesson using Sequelize model
    const lesson = await connection.lessons.create({
      teacher_id,
      student_id,
      group_id,
      lesson_name,
      lesson_date: formattedLessonDate,
      lesson_mode,
      repeatAt,
      description,
    });

    // Return success response
    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Lesson added successfully",
        lesson,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
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

// Get all lessons
const getAllLessons = async (request, context) => {
  try {
    // Retrieve all lessons from the database
    const lessons = await connection.lessons.findAll();

    // Return success response with lessons data
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Lessons retrieved successfully",
        lessons,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
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

// Get lessons by teacher ID
const getLessonsByTeacherId = async (request, context) => {
  try {
    // Extract teacher_id from the request parameters
    const { teacher_id } = request.params;

    // Find all lessons associated with the provided teacher_id
    const lessons = await connection.lessons.findAll({
      where: { teacher_id },
    });

    // Return success response with lessons data
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Lessons retrieved successfully",
        lessons,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
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

// Get lessons by teacher ID and group ID
const getLesssonsByTeacherIdandGroupId = async (request, context) => {
  try {
    // Extract teacher_id and group_id from the request parameters
    const { teacher_id, group_id } = request;

    // Find all lessons associated with the provided teacher_id and group_id
    const lessons = await connection.lessons.findAll({
      where: { teacher_id, group_id },
    });

    // Return success response with lessons data
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Lessons retrieved successfully",
        lessons,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
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

// Remove a lesson by ID
const removeLesson = async (request, context) => {
  try {
    // Extract the lesson ID from the request parameters
    const { id } = request.params;

    // Delete the lesson from the database
    await connection.lessons.destroy({
      where: { id },
    });

    // Return success response
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Lesson removed successfully",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
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

// Export the service functions
module.exports = {
  addLesson,
  getAllLessons,
  getLessonsByTeacherId,
  getLesssonsByTeacherIdandGroupId,
  removeLesson,
};
