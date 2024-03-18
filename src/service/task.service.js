const taskRepository  = require('../repository/task.repository');

class TaskService {

    constructor() {}

    async getTasks() {
        return await taskRepository.getTasks();
    }

    async createTask(task,context) {
        context.log("-----service----")
        return await taskRepository.createTask(task,context);
    }

    async updateTask(task) {
        return await taskRepository.updateTask(task);
    }

    async deleteTask(taskId) {
        return await taskRepository.deleteTask(taskId);
    }

}

module.exports = new TaskService();