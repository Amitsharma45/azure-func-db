const taskService = require("../services/tasks.service");

const multer = require("multer");
const uploadToBlobStorage = require("../config/uploadDoument");

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("file");

// Controller to add a task
const addTask = async (request, context) => {
  const body = await request.json();
  const response = await uploadToBlobStorage({ content: body.file });

  if (response.status === "success") {
    return await taskService.addTask(
      {
        teacher_id: body.teacher_id,
        student_id: body.student_id,
        name: body.name,
        description: body.description,
        community_id: body.community_id,
        group_id: body.group_id,
      },
      context
    );
  } else {
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
const getTasksByCommunityAndGroupId = async (request, context) => {
  const { community_id, group_id } = request.params;

  return await taskService.getTasksByCommunityAndGroupId(
    community_id,
    group_id
  );
};

// Controller to get tasks by community ID and student ID
const getTasksByCommunityAndStudentId = async (request, context) => {
  const { community_id, student_id } = request.params;

  return await taskService.getTasksByCommunityAndStudentId(
    community_id,
    student_id
  );
};

module.exports = {
  addTask,
  getAllTasksByTeacherId,
  getTasksByCommunityAndGroupId,
  getTasksByCommunityAndStudentId,
  removeTask,
  // addMedia,
};
