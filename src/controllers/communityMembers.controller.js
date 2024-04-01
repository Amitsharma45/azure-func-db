const communityMemberService = require("../services/communityMembers.service");

// Controller to add a member to a community
const addCommunityMember = async (request, context) => {
  return await communityMemberService.addCommunityMember(request, context);
};

// Controller to get all members of a community
const getAllCommunityMembers = async (request, context) => {
  return await communityMemberService.getAllCommunityMembers(request, context);
};

// Controller to remove a member from a community
const removeCommunityMember = async (request, context) => {
  return await communityMemberService.removeCommunityMember(request, context);
};

module.exports = {
  addCommunityMember,
  getAllCommunityMembers,
  removeCommunityMember,
};
