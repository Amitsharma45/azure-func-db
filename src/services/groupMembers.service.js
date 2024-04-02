const db = require("../config/db.config");
const connection = db.getConnection();

const addGroupMember = async (request, context) => {
  try {
    const { group_member_id, group_id } = request;

    // Create the group member
    const groupMember = await connection.group_members.create({
      group_member_id,
      group_id,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Group member added successfully",
        groupMember,
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

const getAllGroupMembers = async (request, context) => {
  try {
    const { group_id } = request.params;

    const groupMembers = await connection.group_members.findAll({
      where: { group_id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group members retrieved successfully",
        groupMembers,
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

const removeGroupMember = async (request, context) => {
  try {
    const { id } = request.params;

    await connection.group_members.destroy({
      where: { id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group member removed successfully",
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

// Remove a group member by group_member_id and group_id
const removeGroupMemberByMemberAndGroup = async (request) => {
  try {
    const { member_id, group_id } = request.params;

    await connection.group_members.destroy({
      where: { group_member_id: member_id, group_id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group member removed successfully",
      },
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
    };
  }
};

module.exports = {
  addGroupMember,
  getAllGroupMembers,
  removeGroupMember,
  removeGroupMemberByMemberAndGroup,
};
