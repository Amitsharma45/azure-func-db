const { connect } = require("../config/db.config");
// const logger = require('../logger/api.logger');

class TaskRepository {
  db = {};

  constructor() {
    (async () => {
      try {
        this.db = await connect();
        console.log("db connected success");
      } catch (error) {
        console.error("Error connecting to the database:", error);
        // Handle the error accordingly
      }
    })();
  }

  async getTasks() {
    try {
      const tasks = await this.db.tasks.findAll();
      console.log("tasks:::", tasks);
      return tasks;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async createTask(task, context) {
    let data = {};
    try {
      context.log("-----task.repository.js----", task);
      data = await this.db.tasks.create(task);
    } catch (err) {
      // logger.error('Error::' + err);
      // context.log(err);
      console.log("-----error----38", err);
      return err;
    }
    return data;
  }

  async updateTask(task) {
    let data = {};
    try {
      console.log("task:::", task);
      // task.updateddate = new Date().toISOString();
      data = await this.db.tasks.update(
        { ...task },
        {
          where: {
            id: task.id,
          },
        }
      );
    } catch (err) {
      // logger.error('Error::' + err);
    }
    return data;
  }

  async deleteTask(taskId) {
    let data = {};
    try {
      data = await this.db.tasks.destroy({
        where: {
          id: taskId,
        },
      });
    } catch (err) {
      // logger.error('Error::' + err);
    }
    return data;
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new TaskRepository();
