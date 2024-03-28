const { app } = require("@azure/functions");
const community = require("../../controllers/community.controller");

// Create Community endpoint
app.http("createCommunity", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "communities/create",
  handler: community.createCommunity,
});

// Get Community by ID endpoint
app.http("getCommunityById", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "communities/{id}",
  handler: community.getCommunityById,
});

// Get Community by Owner ID endpoint
app.http("getCommunityByOwnerId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "communities/owner/{ownerId}",
  handler: community.getCommunityByOwnerId,
});

// Get All Communities endpoint
app.http("getAllCommunities", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "communities",
  handler: community.getAllCommunities,
});
