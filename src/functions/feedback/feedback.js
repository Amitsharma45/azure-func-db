const { app } = require("@azure/functions");
const feedbackController = require("../../controllers/feedback.controller");

// Add Feedback endpoint
app.http("addFeedback", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "feedbacks/add",
  handler: feedbackController.addFeedback,
});

// Get Feedback by Sender ID endpoint
app.http("getFeedbackBySenderId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "feedbacks/sender/{sender_id}",
  handler: feedbackController.getFeedbackBySenderId,
});

// Get Feedback by Receiver ID endpoint
app.http("getFeedbackByReceiverId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "feedbacks/receiver/{receiver_id}",
  handler: feedbackController.getFeedbackByReceiverId,
});

// Remove Feedback endpoint
app.http("removeFeedback", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "feedbacks/{id}",
  handler: feedbackController.removeFeedback,
});

// Get Feedbacks by Community ID and Group ID endpoint
app.http("getFeedbacksByTeacherIdAndGroupId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "feedbacks/teacher/{sender_id}/group/{group_id}",
  handler: feedbackController.getFeedbacksByTeacherIdAndGroupId,
});
