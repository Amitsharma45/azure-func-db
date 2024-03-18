const { connect } = require('../config/db.config');
// const logger = require('../logger/api.logger');


class TaskRepository {

    db = {};

    constructor() {
        this.db = connect();
        console.log("db connected success")
        // For Development
        /*this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });*/
    }

    async getTasks() {
        
        try {
            console.log("-----task.repository.js----")
            const tasks = await this.db.tasks.findAll();
            console.log('tasks:::', tasks);
            return tasks;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createTask(task) {
        let data = {};
        try {
            data = await this.db.tasks.create(task);
        } catch(err) {
            // logger.error('Error::' + err);
            console.log(err);
            console.log("-----error----38")
        }
        return data;
    }

    async updateTask(task) {
        let data = {};
        try {
            console.log('task:::', task)
            // task.updateddate = new Date().toISOString();
            data = await this.db.tasks.update({...task}, {
                where: {
                    id: task.id
                }
            });
        } catch(err) {
            // logger.error('Error::' + err);
        }
        return data;
    }

    async deleteTask(taskId) {
        let data = {};
        try {
            data = await this.db.tasks.destroy({
                where: {
                    id: taskId
                }
            });
        } catch(err) {
            // logger.error('Error::' + err);
        }
        return data;
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new TaskRepository();