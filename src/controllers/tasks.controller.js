const taskService = require("../services/tasks.service");
const fileService = require("../services/files.service");

const multer = require("multer");
const uploadToBlobStorage = require("../config/uploadDoument");

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("file");

// Controller to add a task
const addTask = async (request, context) => {
  try {
    const body = await request.json();

    // Create the task
    const taskResponse = await taskService.addTask(
      {
        teacher_id: body.teacher_id,
        student_id: body.student_id,
        name: body.name,
        description: body.description,
        group_id: body.group_id,
      },
      context
    );

    if (taskResponse.status !== 201) {
      return taskResponse;
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
        association_id: taskResponse.jsonBody.task.dataValues.id,
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

// Controller to get all tasks
const getAllTasksByTeacherId = async (request, context) => {
  return await taskService.getAllTasksByTeacherId(request, context);
};

// Controller to remove a task
const removeTask = async (request, context) => {
  return await taskService.removeTask(request, context);
};

// Controller to get tasks by community ID and group ID
const getTasksByTeacherAndGroupId = async (request, context) => {
  const { teacher_id, group_id } = request.params;

  return await taskService.getTasksByTeacherAndGroupId(teacher_id, group_id);
};

// Controller to get tasks by community ID and student ID
const getTasksByTeacherAndStudentId = async (request, context) => {
  const { teacher_id, student_id } = request.params;

  return await taskService.getTasksByTeacherAndStudentId(
    teacher_id,
    student_id
  );
};

module.exports = {
  addTask,
  getAllTasksByTeacherId,
  getTasksByTeacherAndGroupId,
  getTasksByTeacherAndStudentId,
  removeTask,
};
