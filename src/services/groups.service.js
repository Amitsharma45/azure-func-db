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
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group Data retrieved successfully",
        tasks: tasks,
        feedbacks: feedbacks,
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

const changeGroupName = async ({ group_id, group_name }) => {
  try {
    const groupData = await connection.groups.update(
      { group_name },
      {
        where: {
          id: group_id,
        },
      }
    );
    console.log({ groupData })
    return {
      status: 200,
      message: "Group name changed successfully",
    };
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  addGroup,
  getAllGroups,
  removeGroup,
  getGroupsDataByTeacherIdAndGroupId,
  changeGroupName,
};
