const db = require("../config/db.config");
const connection = db.getConnection();
const { Sequelize } = require("sequelize");

const addGroupMember = async (request) => {
  try {
    const { memberData } = request;
    // Create the group member
    const groupMember = await connection.group_members.bulkCreate(memberData);

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

    // const groupMembers = await connection.group_members.findAll({
    //   where: { group_id },
    // });

    const groupMembers = await connection.sequelize.query(`
      SELECT 
        users.email,
        users.firstName,
        users.lastName,
        users.id AS user_id,
        group_members.group_id,
        group_members.group_member_id AS community_members_id,
        group_members.id AS group_member_id
      FROM group_members
      LEFT JOIN community_members
      ON group_members.group_member_id = community_members.id
      LEFT JOIN users
      ON community_members.member_id = users.id
      WHERE group_members.group_id = ${group_id}
    `);

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group members retrieved successfully",
        groupMembers: groupMembers[0],
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

const getAllMembersNotInGroup = async (request, context) => {
  try {
    // const { group_id, community_id } = request.params;
    const body = await request.json();
    const { group_id, community_id } = body;
    const groupMembers = await connection.sequelize.query(`
          SELECT 
              users.email,
              users.firstName,
              users.lastName,
              users.id AS user_id,
              community_members.id AS community_member_id
          FROM community_members
          LEFT JOIN users ON community_members.member_id = users.id
          WHERE community_members.community_id = ${community_id}
          AND NOT EXISTS (
              SELECT 1
              FROM group_members
              WHERE group_members.group_member_id = community_members.id
              AND group_members.group_id = ${group_id}
          )   
    `);

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group members retrieved successfully",
        groupMembers: groupMembers[0],
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
    const { member_id } = request.params;

    await connection.group_members.destroy({
      where: { id: member_id },
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
  getAllMembersNotInGroup,
};
