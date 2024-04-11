const { app } = require("@azure/functions");
const group = require("../../controllers/groups.controller");
const groupMembers = require("../../controllers/groupMembers.controller");

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

app.http("changeGroupName",{
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "group/changeName",
  handler: group.changeGroupName,
});

// Add endpoint for getting groups data by teacher_id and group_id
app.http("getGroupsDataByTeacherIdAndGroupId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "groups/teacher/{teacher_id}/group/{group_id}",
  handler: group.getGroupsDataByTeacherIdAndGroupId,
});

// Add endpoint for getting groups data by teacher_id and group_id
app.http("getGroupsDataByTeacherIdAndStudentId", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "groups/teacher/{teacher_id}/student/{student_id}",
  handler: group.getGroupsDataByTeacherIdAndStudentId,
});
// Remove Group endpoint
app.http("removeGroup", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "groups/{id}",
  handler: group.removeGroup,
});

// Add Group Member endpoint
app.http("addGroupMember", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "groupMembers/add",
  handler: groupMembers.addGroupMember,
});

// Get All Group Members endpoint
app.http("getAllGroupMembers", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "groupMembers/{group_id}",
  handler: groupMembers.getAllGroupMembers,
});

// Get All Group Members endpoint
app.http("getAllMembersNotInGroup", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "groupMembers/notInGroup",
  handler: groupMembers.getAllMembersNotInGroup,
});

// Remove Group Member endpoint
// app.http("removeGroupMember", {
//   methods: ["DELETE"],
//   authLevel: "anonymous",
//   route: "groupMembers/{group_id}/{member_id}",
//   handler: groupMembers.removeGroupMember,
// });

app.http("removeGroupMember", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "groupMembers/{member_id}",
  handler: groupMembers.removeGroupMember,
});

