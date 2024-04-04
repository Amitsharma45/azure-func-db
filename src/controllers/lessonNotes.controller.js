const lessonNotesService = require("../services/lessonNotes.service");

// Controller to add a lesson note
const addLessonNote = async (request, context) => {
  const body = await request.json();

  return await lessonNotesService.addLessonNote({
    lesson_id: body.lesson_id,
    content: body.content,
    multimedia_link: body.multimedia_link,
    lesson_date: body.lesson_date,
  });
};

// Controller to remove a lesson note
const removeLessonNote = async (request, context) => {
  return await lessonNotesService.removeLessonNote(request);
};

// Controller to get lesson notes by lesson ID
const getLessonNotesByLessonId = async (request, context) => {
  return await lessonNotesService.getLessonNotesByLessonId(request);
};

module.exports = {
  addLessonNote,
  removeLessonNote,
  getLessonNotesByLessonId,
};
