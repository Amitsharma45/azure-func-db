const lessonNotesService = require("../services/lessonNotes.service");
const fileService = require("../services/files.service");

const uploadToBlobStorage = require("../config/uploadDoument");

// Controller to add a lesson note
const addLessonNote = async (request, context) => {
  try {
    const body = await request.json();

    const lessonNotesResponse = await lessonNotesService.addLessonNote({
      lesson_id: body.lesson_id,
      name: body.name,
      description: body.description,
    });
    if (lessonNotesResponse.status !== 201) {
      return lessonNotesResponse;
    }

    // Array to hold file creation promises
    const fileUploadPromises = [];

    // Iterate over each file and upload to Azure Blob Storage
    for (let i = 0; i < body.files.length; i++) {
      const file = body.files[i]._j;
      const fileName = body.fileNames[i];
      const fileType = body.fileTypes[i];

      // Upload file to Azure Blob Storage
      const uploadResponse = await uploadToBlobStorage({
        fileContent: file,
        fileName: fileName,
        fileType: fileType,
      });

      if (uploadResponse.status !== "success") {
        return uploadResponse;
      }

      // Add file creation promise to array
      const fileCreationPromise = fileService.addFile({
        uploaded_by: body.teacher_id,
        association_id: lessonNotesResponse.jsonBody.lessonNote.dataValues.id,
        association_type: body.association_type,
        type: fileType,
        url: uploadResponse.fileUrl,
      });

      // Push promise to array
      fileUploadPromises.push(fileCreationPromise);
    }

    // Wait for all file creation promises to resolve
    await Promise.all(fileUploadPromises);

    // Return success response
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Task and associated files created successfully.",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error:", error);
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
