const db = require("../config/db.config");
const connection = db.getConnection();

const addFeedback = async (
  sender_id,
  receiver_id,
  feedback_note,
  community_id,
  group_id
) => {
  try {
    // Create the feedback
    const feedback = await connection.feedbacks.create({
      sender_id,
      receiver_id,
      feedback_note,
      community_id,
      group_id,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Feedback added successfully",
        feedback,
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

const getFeedbackBySenderId = async (senderId) => {
  try {
    const feedbacks = await connection.feedbacks.findAll({
      where: { sender_id: senderId },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Feedbacks retrieved successfully",
        feedbacks,
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

const getFeedbackByReceiverId = async (receiverId) => {
  try {
    const feedbacks = await connection.feedbacks.findAll({
      where: { receiver_id: receiverId },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Feedbacks retrieved successfully",
        feedbacks,
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

const removeFeedback = async (feedbackId) => {
  try {
    await connection.feedbacks.destroy({
      where: { id: feedbackId },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Feedback removed successfully",
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

const getFeedbacksByCommunityIdAndGroupId = async (communityId, groupId) => {
  try {
    const feedbacks = await connection.feedbacks.findAll({
      where: { community_id: communityId, group_id: groupId },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Feedbacks retrieved successfully",
        feedbacks,
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
  addFeedback,
  getFeedbackBySenderId,
  getFeedbackByReceiverId,
  getFeedbacksByCommunityIdAndGroupId,
  removeFeedback,
};
