const db = require("../config/db.config");
const connection = db.getConnection();

// Add a new task
const addTask = async (request, context) => {
  try {
    const {
      teacher_id,
      student_id,
      name,
      description,
      community_id,
      group_id,
    } = request;

    // Create the task
    const task = await connection.tasks.create({
      teacher_id,
      student_id,
      name,
      description,
      community_id,
      group_id,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Task added successfully",
        task,
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

// Get all tasks
const getAllTasks = async (request, context) => {
  try {
    const tasks = await connection.tasks.findAll();

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Tasks retrieved successfully",
        tasks,
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

// Remove a task
const removeTask = async (request, context) => {
  try {
    const { id } = request.params;

    await connection.tasks.destroy({
      where: { id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Task removed successfully",
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

// Get all tasks by teacher ID
const getAllTasksByTeacherId = async (request, context) => {
  try {
    const { teacher_id } = request.params;

    const tasks = await connection.tasks.findAll({
      where: { teacher_id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Tasks retrieved successfully",
        tasks,
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

// Get tasks by community ID and group ID
const getTasksByCommunityAndGroupId = async (communityId, groupId) => {
  try {
    const tasks = await connection.tasks.findAll({
      where: { community_id: communityId, group_id: groupId },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Tasks retrieved successfully",
        tasks,
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

// Get tasks by community ID and student ID
const getTasksByCommunityAndStudentId = async (communityId, studentId) => {
  try {
    const tasks = await connection.tasks.findAll({
      where: { community_id: communityId, student_id: studentId },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Tasks retrieved successfully",
        tasks,
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
  addTask,
  getAllTasks,
  getAllTasksByTeacherId,
  getTasksByCommunityAndGroupId,
  getTasksByCommunityAndStudentId,
  removeTask,
};
