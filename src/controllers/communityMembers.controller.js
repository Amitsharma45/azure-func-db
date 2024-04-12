const communityMemberService = require("../services/communityMembers.service");

// Controller to add a member to a community
const addCommunityMember = async (request, context) => {
  const body = await request.json();
  return await communityMemberService.addCommunityMember(body, context);
};

// Controller to get all members of a community
const getAllCommunityMembers = async (request, context) => {
  return await communityMemberService.getAllCommunityMembers(request, context);
};

// Controller to remove a member from a community
const removeCommunityMember = async (request, context) => {
  return await communityMemberService.removeCommunityMember(request, context);
};

const getCommunityMemberByMemberId = async (request, context) => {
  const { memberId } = request.params;
  return await communityMemberService.getCommunityMemberByMemberId(memberId);
};

const getAllCommunityStudent = async (request, context) => {
  const { community_id } = request.params;
  return await communityMemberService.getAllCommunityStudent(community_id);
}

const changeCommunityMemberType = async (request, context) => {
  const { memberId } = request.params;
  const body = await request.json();
  return await communityMemberService.changeCommunityMemberType(memberId, body);
}

module.exports = {
  addCommunityMember,
  getAllCommunityMembers,
  removeCommunityMember,
  getCommunityMemberByMemberId,
  getAllCommunityStudent,
  changeCommunityMemberType
};
