const taskService = require("../services/tasks.service");

// Controller to add a task
const addTask = async (request, context) => {
  const body = await request.json();

  return await taskService.addTask(
    {
      teacher_id: body.teacher_id,
      content: body.content,
      due_date: body.due_date,
    },
    context
  );
};

// Controller to get all tasks
const getAllTasks = async (request, context) => {
  return await taskService.getAllTasksByTeacherId(request, context);
};

// Controller to remove a task
const removeTask = async (request, context) => {
  return await taskService.removeTask(request, context);
};

module.exports = {
  addTask,
  getAllTasks,
  removeTask,
};
