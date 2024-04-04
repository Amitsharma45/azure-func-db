const db = require("../config/db.config");
const connection = db.getConnection();

const DataTypes = require("sequelize/lib/data-types");

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

// Add a new task
const addTask = async (request, context) => {
  try {
    const { teacher_id, content, due_date } = request;

    const formattedDueDate = new Date(due_date).toISOString();

    // Create the task
    const task = await connection.tasks.create({
      teacher_id,
      content,
      due_date: formattedDueDate,
    });

    return {
      status: 201,
      jsonBody: {
        status: 201,
        message: "Task added successfully",
        task,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.log("Error: ", error);
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

// Get all tasks
const getAllTasks = async (request, context) => {
  try {
    const tasks = await connection.tasks.findAll();

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Tasks retrieved successfully",
        tasks,
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

// Remove a task
const removeTask = async (request, context) => {
  try {
    const { id } = request.params;

    await connection.tasks.destroy({
      where: { id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Task removed successfully",
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

const getAllTasksByTeacherId = async (request, context) => {
  try {
    const { teacher_id } = request.params;

    const tasks = await connection.tasks.findAll({
      where: { teacher_id },
    });

    return {
      status: 200,
      jsonBody: {
        status: 200,
        message: "Tasks retrieved successfully",
        tasks,
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

module.exports = {
  addTask,
  getAllTasks,
  getAllTasksByTeacherId,
  removeTask,
};
