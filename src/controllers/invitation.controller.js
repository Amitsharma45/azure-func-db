const { sendEmail } = require("../config/send-email");
const invitedUserService = require("../services/invitedUser.sevice");
const inviteCodeService = require("../services/inviteCodes.service");
const communityService = require("../services/community.service");

// Define the inviteUser function
const inviteUser = async (request, context) => {
  try {
    const body = await request.json();
    const { invited_by, email, name, invited_as, community_id } = body;

    // Check if the user has already been invited
    const existingInvitedUser = await invitedUserService.getInvitedUserByEmail(
      email
    );

    if (existingInvitedUser.status === 200) {
      // User has already been invited, return appropriate response
      return {
        status: 400,
        body: JSON.stringify({
          status: 400,
          message: "User already invited",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // Call getCommunityByOwnerId to get the community details
    const communityResponse = await communityService.getCommunityByOwnerId({
      params: { ownerId: invited_by },
    });

    // Check if the community was retrieved successfully
    if (communityResponse.status !== 200) {
      // Return an error response if the community retrieval failed
      return {
        status: 500,
        body: JSON.stringify({
          status: 500,
          message:
            "Failed to invite user. Error occurred while retrieving community details.",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // Extract the community ID from the response
    const communityId = communityResponse.jsonBody.community.id;

    const emailSubject = `You have been invited to SymphoMe by ${name}!`;
    const emailBody =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis tristique nisl, eget bibendum lorem consectetur et.";

    // Call sendEmail function
    const emailResponse = await sendEmail(
      emailSubject,
      emailBody,
      email,
      context
    );

    // Check if email was sent successfully
    if (emailResponse.status === 200) {
      return await invitedUserService.createInvitedUser({
        invited_by,
        email,
        invited_as,
        community_id: communityId,
      });
    } else {
      // Return an error response if email sending failed
      return (context.res = {
        status: 500,
        body: JSON.stringify({
          status: 500,
          message: "Failed to invite user. Error occurred while sending email.",
          emailError: emailResponse.body, // Include email error message in the response
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    // Return an error response if any exception occurred
    return (context.res = {
      status: 500,
      body: JSON.stringify({
        status: 500,
        message: "Internal Server Error1",
        error: error.message, // Include the error message in the response
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Controller to get an invited user by ID
const getInvitedUserById = async (request, context) => {
  try {
    return await invitedUserService.getInvitedUserById(request, context);
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

// Controller to get invited users by community ID
const getInvitedUsersByCommunityId = async (request, context) => {
  try {
    return await invitedUserService.getInvitedUsersByCommunityId(
      request,
      context
    );
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

// Controller to get all invited users
const getAllInvitedUsers = async (request, context) => {
  try {
    return await invitedUserService.getAllInvitedUsers(request, context);
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

// Controller to get all invited users
const deleteInvitedUserById = async (request, context) => {
  try {
    return await invitedUserService.deleteInvitedUserById(request, context);
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

// Controller to create an invite code
const createInviteCode = async (request, context) => {
  try {
    return await inviteCodeService.createInviteCode(request, context);
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

// Controller to get an invite code by ID
const getInviteCodeById = async (request, context) => {
  try {
    return await inviteCodeService.getInviteCodeById(request, context);
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

// Controller to get an invite code by user ID
const getInviteCodeByUserId = async (request, context) => {
  try {
    return await inviteCodeService.getInviteCodeByUserId(request, context);
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
  inviteUser,
  getInvitedUserById,
  getInvitedUsersByCommunityId,
  getAllInvitedUsers,
  deleteInvitedUserById,
  createInviteCode,
  getInviteCodeById,
  getInviteCodeByUserId,
};
