const taskService = require("../services/tasks.service");

// Controller to add a task
const addTask = async (request, context) => {
  const body = await request.json();

  return await taskService.addTask(
    {
      teacher_id: body.teacher_id,
      student_id: body.student_id,
      name: body.name,
      description: body.description,
      community_id: body.community_id,
      group_id: body.group_id,
    },
    context
  );
};

// Controller to get all tasks
const getAllTasksByTeacherId = async (request, context) => {
  return await taskService.getAllTasksByTeacherId(request, context);
};

// Controller to remove a task
const removeTask = async (request, context) => {
  return await taskService.removeTask(request, context);
};

module.exports = {
  addTask,
  getAllTasksByTeacherId,
  removeTask,
};
