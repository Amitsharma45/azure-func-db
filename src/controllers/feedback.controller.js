const feedbackService = require("../services/feedback.sevice");

// Controller to add feedback
const addFeedback = async (request, context) => {
  const { sender_id, receiver_id, feedback_note, community_id, group_id } =
    await request.json();
  return await feedbackService.addFeedback(
    sender_id,
    receiver_id,
    feedback_note,
    community_id,
    group_id
  );
};

// Controller to get feedback by sender ID
const getFeedbackBySenderId = async (request, context) => {
  const { sender_id } = request.params;
  return await feedbackService.getFeedbackBySenderId(sender_id);
};

// Controller to get feedback by receiver ID
const getFeedbackByReceiverId = async (request, context) => {
  const { receiver_id } = request.params;
  return await feedbackService.getFeedbackByReceiverId(receiver_id);
};

// Controller to get feedbacks by community ID and group ID
const getFeedbacksByCommunityIdAndGroupId = async (request, context) => {
  const { community_id, group_id } = request.params;
  return await feedbackService.getFeedbacksByCommunityIdAndGroupId(
    community_id,
    group_id
  );
};

// Controller to remove feedback
const removeFeedback = async (request, context) => {
  const { id } = request.params;
  return await feedbackService.removeFeedback(id);
};

module.exports = {
  addFeedback,
  getFeedbackBySenderId,
  getFeedbackByReceiverId,
  getFeedbacksByCommunityIdAndGroupId,
  removeFeedback,
};
