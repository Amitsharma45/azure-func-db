const db = require("../config/db.config");
const connection = db.getConnection();

// Add a user to a community
const addCommunityMember = async (request, context) => {
  try {
    const body = await request.json();
    const { member_id, member_type, community_id } = body;

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

    const communityMembers = await connection.community_members.findAll({
      where: { community_id },
    });

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

module.exports = {
  addCommunityMember,
  getAllCommunityMembers,
  removeCommunityMember,
};
