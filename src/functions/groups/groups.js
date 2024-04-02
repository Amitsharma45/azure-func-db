const { app } = require("@azure/functions");
const group = require("../../controllers/groups.controller");

// Add Group endpoint
app.http("addGroup", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "groups/add",
  handler: group.addGroup,
});

// Get All Groups endpoint
app.http("getAllGroups", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "groups/{community_id}",
  handler: group.getAllGroups,
});

// Remove Group endpoint
app.http("removeGroup", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "groups/{id}",
  handler: group.removeGroup,
});
