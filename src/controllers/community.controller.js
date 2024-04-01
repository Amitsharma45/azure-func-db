const communityService = require("../services/community.service");

// Controller to create a new community
const createCommunity = async (request, context) => {
  const body = await request.json();
  return await communityService.createCommunity(body, context);
};

// Controller to get a community by ID
const getCommunityById = async (request, context) => {
  return await communityService.getCommunityById(request, context);
};

// Controller to get a community by Owner ID
const getCommunityByOwnerId = async (request, context) => {
  return await communityService.getCommunityByOwnerId(request, context);
};

// Controller to get all communities
const getAllCommunities = async (request, context) => {
  return await communityService.getAllCommunities(request, context);
};

module.exports = {
  createCommunity,
  getCommunityById,
  getCommunityByOwnerId,
  getAllCommunities,
};
