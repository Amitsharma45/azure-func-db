const db = require("../config/db.config");
const connection = db.getConnection();

// Create a new invited user
const createInvitedUser = async ({
  invited_by,
  email,
  invited_as,
  community_id,
}) => {
  try {
    // Create the invited user
    const invitedUser = await connection.invited_users.create({
      invited_by,
      email,
      invited_as,
      community_id,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Invited user created successfully",
        invitedUser,
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

// Get a single invited user by ID
const getInvitedUserById = async (request, context) => {
  try {
    const { id } = request.params;

    const invitedUser = await connection.invited_users.findOne({
      where: { id },
    });

    if (!invitedUser) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Invited user not found",
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
        message: "Invited user retrieved successfully",
        invitedUser,
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

// Get all invited users
const getAllInvitedUsers = async (request, context) => {
  try {
    console.log("here2");
    const invitedUsers = await connection.invited_users.findAll();
    console.log("invitedUsers", invitedUsers);

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Invited users retrieved successfully",
        invitedUsers,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.log("Error123:", error);
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

// Update an existing invited user by ID
const updateInvitedUser = async (request, context) => {
  try {
    const { id } = request.params;
    const body = await request.json();

    const invitedUser = await connection.invited_users.findOne({
      where: { id },
    });

    if (!invitedUser) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Invited user not found",
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    await invitedUser.update(body);

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Invited user updated successfully",
        invitedUser,
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

// Delete an invited user by ID
const deleteInvitedUserById = async (request, context) => {
  try {
    const { id } = request.params;

    console.log("id111111111111", id);

    const deletedInvitedUser = await connection.invited_users.destroy({
      where: { id },
    });

    if (!deletedInvitedUser) {
      return {
        status: 404,
        jsonBody: {
          status: 404,
          message: "Invited user not found",
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
        message: "Invited user deleted successfully",
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
  createInvitedUser,
  getInvitedUserById,
  getAllInvitedUsers,
  updateInvitedUser,
  deleteInvitedUserById,
};
