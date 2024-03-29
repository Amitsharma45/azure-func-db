const db = require("../config/db.config");
const connection = db.getConnection();

const createInviteCode = async ({
  userId,
  community_id,
  teachers_invite_code,
  students_invite_code,
}) => {
  try {
    const inviteCode = await connection.invite_codes.create({
      userId,
      community_id,
      teachers_invite_code,
      students_invite_code,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Invite code created successfully",
        inviteCode,
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

const getInviteCodeById = async (request, context) => {
  try {
    const { id } = request.params;

    const inviteCode = await connection.invite_codes.findOne({
      where: { id },
    });

    if (!inviteCode) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Invite code not found",
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
        message: "Invite code retrieved successfully",
        inviteCode,
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

const getInviteCodeByUserId = async (request) => {
  const { userId } = request.params;

  try {
    const inviteCode = await connection.invite_codes.findOne({
      where: { userId },
    });

    if (!inviteCode) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Invite code not found for the user",
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
        message: "Invite code retrieved successfully",
        inviteCode,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.log("Error: ", error);
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

// Implement other CRUD operations as needed (e.g., getAllInviteCodes, updateInviteCode, deleteInviteCodeById)

module.exports = {
  createInviteCode,
  getInviteCodeById,
  getInviteCodeByUserId,
};
