const { app } = require("@azure/functions");
const invitation = require("../../controllers/invitation.controller");

app.http("inviteUser", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "invitation/inviteUser",
  handler: invitation.inviteUser,
});

app.http("getInvitedUserById", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "invitation/user/{id}",
  handler: invitation.getInvitedUserById,
});

app.http("getInvitedUsersByCommunityId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "invitation/community/{communityId}",
  handler: invitation.getInvitedUsersByCommunityId,
});

app.http("getAllInvitedUsers", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "invitation/getAllInvitedUsers",
  handler: invitation.getAllInvitedUsers,
});

app.http("deleteInvitedUserById", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "invitation/user/{id}",
  handler: invitation.deleteInvitedUserById,
});

app.http("createInviteCode", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "inviteCode/create",
  handler: invitation.createInviteCode,
});

app.http("getInviteCodeById", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "inviteCode/{id}",
  handler: invitation.getInviteCodeById,
});

app.http("getInviteCodeByUserId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "inviteCode/user/{userId}",
  handler: invitation.getInviteCodeByUserId,
});
