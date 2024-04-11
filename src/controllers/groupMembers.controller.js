const groupMemberService = require("../services/groupMembers.service");
const communityMemberService = require("../services/communityMembers.service");

// Controller to add a member to a group
const addGroupMember = async (request, context) => {
  const body = await request.json();
  const memberId = body.user_id;
  const communityMember =
    await communityMemberService.getCommunityMemberByMemberId(memberId);

    const { members, group_id } = body;

    // const communityMember =
    //   await communityMemberService.getCommunityMemberByMemberId(user_id);

    // if (communityMember.status === 404) {
    //   return communityMember;
    // }

    // const communityMemberId =
    //   communityMember.jsonBody.communityMember.dataValues.id;

    const memberData = [];
    await members.forEach((member) => {
      memberData.push({
        group_id,
        group_member_id: member.community_member_id,
      });
    });

    const resp = await groupMemberService.addGroupMember({ memberData });
    
    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Member add in group  successfully",
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
        error,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

// Controller to get all members of a group
const getAllGroupMembers = async (request, context) => {
  return await groupMemberService.getAllGroupMembers(request, context);
};

// Controller to get all members of a group
const getAllMembersNotInGroup = async (request, context) => {
  return await groupMemberService.getAllMembersNotInGroup(request, context);
};

// Controller to remove a member from a group
const removeGroupMember = async (request, context) => {
  return await groupMemberService.removeGroupMember(request, context);
};

// // Controller to remove a member from a group
// const removeGroupMember = async (request, context) => {
//   return await groupMemberService.removeGroupMemberByMemberAndGroup(
//     request,
//     context
//   );
// };

module.exports = {
  addGroupMember,
  getAllGroupMembers,
  removeGroupMember,
  getAllMembersNotInGroup,
};
