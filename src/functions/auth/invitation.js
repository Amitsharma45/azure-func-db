const { app } = require("@azure/functions");
const invitation = require("../../controllers/invitation.controller");

// Login endpoint
app.http("inviteUser", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "auth/teacher/inviteUser",
  handler: invitation.inviteUser,
});
