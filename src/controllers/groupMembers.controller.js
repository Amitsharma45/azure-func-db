const groupMemberService = require("../services/groupMembers.service");
const communityMemberService = require("../services/communityMembers.service");

// Controller to add a member to a group
const addGroupMember = async (request, context) => {
  const body = await request.json();
  const memberId = body.user_id;
  const communityMember =
    await communityMemberService.getCommunityMemberByMemberId(memberId);

  if (communityMember.status === 404) {
    return communityMember;
  }

  const communityMemberId =
    communityMember.jsonBody.communityMember.dataValues.id;

  return await groupMemberService.addGroupMember(
    { group_member_id: communityMemberId, group_id: body.group_id },
    context
  );
};

// Controller to get all members of a group
const getAllGroupMembers = async (request, context) => {
  return await groupMemberService.getAllGroupMembers(request, context);
};

// Controller to remove a member from a group
const removeGroupMember = async (request, context) => {
  return await groupMemberService.removeGroupMemberByMemberAndGroup(
    request,
    context
  );
};

module.exports = {
  addGroupMember,
  getAllGroupMembers,
  removeGroupMember,
};
