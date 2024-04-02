const groupService = require("../services/groups.service");
const communityService = require("../services/community.service");

// Controller to add a group to a community
const addGroup = async (request, context) => {
  const body = await request.json();

  const communityResponse = await communityService.getCommunityByOwnerId({
    params: { ownerId: body.owner_id },
  });

  communityId = communityResponse.jsonBody.community.dataValues.id;

  return await groupService.addGroup(
    { group_name: body.group_name, community_id: communityId },
    context
  );
};

// Controller to get all groups of a community
const getAllGroups = async (request, context) => {
  return await groupService.getAllGroups(request, context);
};

// Controller to remove a group from a community
const removeGroup = async (request, context) => {
  return await groupService.removeGroup(request, context);
};

module.exports = {
  addGroup,
  getAllGroups,
  removeGroup,
};
