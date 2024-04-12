const db = require("../config/db.config");
const connection = db.getConnection();

const addGroup = async (request, context) => {
  try {
    const { group_name, community_id } = request;

    // Create the group
    const group = await connection.groups.create({
      group_name,
      community_id,
    });

    return group;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

// Get all groups in a community
const getAllGroups = async (request, context) => {
  try {
    const { community_id } = request.params;

    const groups = await connection.groups.findAll({
      where: { community_id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Groups retrieved successfully",
        groups,
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

// Remove a group from a community
const removeGroup = async (request, context) => {
  try {
    const { id } = request.params;

    await connection.groups.destroy({
      where: { id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group removed successfully",
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

// Main function to get groups data by teacher_id and group_id
const getGroupsDataByTeacherIdAndGroupId = async (teacher_id, group_id) => {
  try {
    const tasks = await connection.tasks.findAll({
      where: { teacher_id, group_id },
    });
    const feedbacks = await connection.feedbacks.findAll({
      where: { sender_id: teacher_id, group_id },
    });
    const lessons = await connection.lessons.findAll({
      where: { teacher_id, group_id },
    });

    const lessonNotesMap = {};

    for (const lesson of lessons) {
      const lessonId = lesson.id;
      const lessonNotes = await connection.lesson_notes.findAll({
        where: { lesson_id: lessonId },
      });
      lessonNotesMap[lessonId] = lessonNotes;
    }

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group Data retrieved successfully",
        tasks: tasks,
        feedbacks: feedbacks,
        lessons: lessons,
        lessonNotes: lessonNotesMap
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

// Main function to get groups data by teacher_id and student_id
const getGroupsDataByTeacherIdAndStudentId = async (teacher_id, student_id) => {
  try {
    const tasks = await connection.tasks.findAll({
      where: { teacher_id, student_id },
    });
    const feedbacks = await connection.feedbacks.findAll({
      where: { sender_id: teacher_id, receiver_id: student_id },
    });
    const lessons = await connection.lessons.findAll({
      where: { teacher_id, student_id },
    });

    const lessonNotesMap = {};

    for (const lesson of lessons) {
      const lessonId = lesson.id;
      const lessonNotes = await connection.lesson_notes.findAll({
        where: { lesson_id: lessonId },
      });
      lessonNotesMap[lessonId] = lessonNotes;
    }

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group Data retrieved successfully",
        tasks: tasks,
        feedbacks: feedbacks,
        lessons: lessons,
        lessonNotes: lessonNotesMap
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

const changeGroupName = async (group_id, group_name) => {
  try {
    console.log({ group_id, group_name });
    const groupData = await connection.groups.update(
      { group_name },
      {
        where: {
          id: group_id,
        },
      }
    );
    console.log({ groupData });
    return {
      status: 200,
      message: "Group name changed successfully",
    };
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

// Add a new function to get a group by its ID
const getGroupById = async (group_id) => {
  try {
    const group = await connection.groups.findOne({
      where: { id: group_id },
    });

    if (!group) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Group not found",
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group retrieved successfully",
        group,
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
  addGroup,
  getAllGroups,
  removeGroup,
  getGroupsDataByTeacherIdAndGroupId,
  getGroupsDataByTeacherIdAndStudentId,
  changeGroupName,
  getGroupById
};
