const groupService = require("../services/groups.service");
const communityService = require("../services/community.service");
const { addGroupMember } = require("../services/groupMembers.service");
// Controller to add a group to a community
const addGroup = async (request, context) => {
  try {
    const body = await request.json();
    const { user_id, group_name, members } = body;

    const communityResponse = await communityService.getCommunityByOwnerId({
      params: { ownerId: body.user_id },
    });

    communityId = communityResponse.jsonBody.community.dataValues.id;

    const groupData = await groupService.addGroup(
      { group_name: group_name, community_id: communityId },
      context
    );
    const group_id = groupData.id;

    const memberData = [];
    await members.forEach((member) => {
      // await addGroupMember({ group_id, group_member_id: member.communityMemberId });
      memberData.push({ group_id, group_member_id: member.communityMemberId });
    });

    const resp = await addGroupMember({ memberData });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Group added successfully",
        groupData,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

// Controller to get all groups of a community
const getAllGroups = async (request, context) => {
  return await groupService.getAllGroups(request, context);
};

// Controller to remove a group from a community
const removeGroup = async (request, context) => {
  return await groupService.removeGroup(request, context);
};

// Controller to get groups data by teacher_id and group_id
const getGroupsDataByTeacherIdAndGroupId = async (request, context) => {
  const { teacher_id, group_id } = request.params;
  return await groupService.getGroupsDataByTeacherIdAndGroupId(
    teacher_id,
    group_id
  );
};

// Controller to get groups data by teacher_id and group_id
const getGroupsDataByTeacherIdAndStudentId = async (request, context) => {
  const { teacher_id, student_id } = request.params;
  return await groupService.getGroupsDataByTeacherIdAndStudentId(
    teacher_id,
    student_id
  );
};
const changeGroupName = async (request, context) => {
  try {

    const body = await request.json();
    const { group_id, group_name } = body;
    
    await groupService.changeGroupName(group_id, group_name);

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Group name changed successfully",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

// Controller to get a group by its ID
const getGroupById = async (request, context) => {
  try {
    const { id } = request.params;
    const groupData = await groupService.getGroupById(id);
    
    return {
      status: groupData.status,
      jsonBody: groupData.jsonBody,
      headers: groupData.headers,
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

module.exports = {
  addGroup,
  getAllGroups,
  removeGroup,
  getGroupsDataByTeacherIdAndGroupId,
  getGroupsDataByTeacherIdAndStudentId,
  changeGroupName,
  getGroupById
};
