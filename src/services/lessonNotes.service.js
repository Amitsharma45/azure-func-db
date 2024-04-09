const db = require("../config/db.config");
const connection = db.getConnection();

// Add a new lesson note
const addLessonNote = async (request, context) => {
  try {
    const { lesson_id, name, description } = request;

    // Create the lesson note
    const lessonNote = await connection.lesson_notes.create({
      lesson_id,
      name,
      description,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Lesson note added successfully",
        lessonNote,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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

// Remove a lesson note
const removeLessonNote = async (request, context) => {
  try {
    const { id } = request.params;

    await connection.lesson_notes.destroy({
      where: { id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Lesson note removed successfully",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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

// Get lesson notes by lesson ID
const getLessonNotesByLessonId = async (request, context) => {
  try {
    const { lesson_id } = request.params;

    const lessonNotes = await connection.lesson_notes.findAll({
      where: { lesson_id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Lesson notes retrieved successfully",
        lessonNotes,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
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

module.exports = {
  addLessonNote,
  removeLessonNote,
  getLessonNotesByLessonId,
};
