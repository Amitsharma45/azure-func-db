const { Sequelize, Model, DataTypes } = require("sequelize");
const db = {};

const initializeConnection = async () => {
  const hostName = process.env.hostName;
  const userName = process.env.userRootName;
  const password = process.env.password;
  const database = process.env.database;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    port: 1433,
    dialect: "mssql",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  // models
  db.users = require("../model/user.model")(sequelize, DataTypes, Model);
  db.communities = require("../model/community.model")(
    sequelize,
    DataTypes,
    Model
  );
  db.invited_users = require("../model/invitedUser.model")(
    sequelize,
    DataTypes,
    Model
  );
  db.invite_codes = require("../model/inviteCodes.model")(
    sequelize,
    DataTypes,
    Model
  );
  db.community_members = require("../model/communityMembers.model")(
    sequelize,
    DataTypes,
    Model
  );
  db.groups = require("../model/groups.model")(sequelize, DataTypes, Model);
  db.group_members = require("../model/groupMembers.model")(
    sequelize,
    DataTypes,
    Model
  );
  db.tasks = require("../model/tasks.model")(sequelize, DataTypes, Model);
  db.feedbacks = require("../model/feedback.model")(
    sequelize,
    DataTypes,
    Model
  );
  db.lessons = require("../model/lessons.model")(sequelize, DataTypes, Model);

  return db;
};

function getConnection() {
  return db;
}

module.exports = {
  initializeConnection,
  getConnection,
};
