const { app } = require("@azure/functions");
const community = require("../../controllers/community.controller");
const communityMember = require("../../controllers/communityMembers.controller");

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

// Add Community Member endpoint
app.http("addCommunityMember", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "communityMembers/add",
  handler: communityMember.addCommunityMember,
});

// Get All Community Members endpoint
app.http("getAllCommunityMembers", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "communityMembers/{community_id}",
  handler: communityMember.getAllCommunityMembers,
});

// Remove Community Member endpoint
app.http("removeCommunityMember", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "communityMembers/{community_id}/{member_id}",
  handler: communityMember.removeCommunityMember,
});
