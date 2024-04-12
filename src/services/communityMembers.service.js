const db = require("../config/db.config");
const connection = db.getConnection();
const { Sequelize } = require("sequelize");

// Add a user to a community
const addCommunityMember = async (request, context) => {
  try {
    const { member_id, member_type, community_id } = request;

    // Create the community member
    const communityMember = await connection.community_members.create({
      member_id,
      member_type,
      community_id,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Community member added successfully",
        communityMember,
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

// Get all members of a community
const getAllCommunityMembers = async (request, context) => {
  try {
    const { community_id } = request.params;
    const communityMembers = await connection.sequelize.query(
      `
      SELECT
            community_members.id AS communityMemberId,  
            community_members.member_id,
            community_members.member_type,
            users.firstName,
            users.lastName,
            users.email,
            users.birthYear
      FROM community_members
      LEFT JOIN users
      ON community_members.member_id = users.id
      WHERE community_members.community_id = :communityId;
      `,
      {
        replacements: { communityId: community_id },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community members retrieved successfully",
        communityMembers,
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
        error,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

// Remove a member from a community
const removeCommunityMember = async (request, context) => {
  try {
    const { member_id, community_id } = request.params;

    await connection.community_members.destroy({
      where: { member_id, community_id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community member removed successfully",
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

const getCommunityMemberByMemberId = async (memberId) => {
  try {
    const communityMember = await connection.community_members.findOne({
      where: { member_id: memberId },
    });

    if (!communityMember) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Community member not found",
        },
      };
    }

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community member retrieved successfully",
        communityMember,
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

const getAllCommunityStudent = async (community_id) => {
  try {
    const communityMembers = await connection.sequelize.query(
      `
      SELECT
            community_members.id AS communityMemberId,  
            community_members.member_id,
            community_members.member_type,
            users.firstName,
            users.lastName,
            users.email,
            users.birthYear,
            users.id AS userId
      FROM community_members
      LEFT JOIN users
      ON community_members.member_id = users.id
      WHERE community_members.community_id = ${community_id}
      AND community_members.member_type = 'Student';
      `
    );

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community members retrieved successfully",
        communityMembers: communityMembers[0],
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
        error,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

const changeCommunityMemberType = async (memberId, body) => {
  try {
    const { member_type } = body;

    const communityMember = await connection.community_members.findOne({
      where: { member_id: memberId },
    });

    if (!communityMember) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Community member not found",
        },
      };
    }

    communityMember.member_type = member_type;
    await communityMember.save();

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Community member type updated successfully",
        communityMember,
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

}

module.exports = {
  addCommunityMember,
  getAllCommunityMembers,
  getCommunityMemberByMemberId,
  removeCommunityMember,
  getAllCommunityStudent,
  changeCommunityMemberType
};
