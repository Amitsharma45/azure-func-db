const { Sequelize, Model, DataTypes } = require("sequelize");
const db = {};

const initializeConnection = () => {

  const hostName = "127.0.0.1";
  const userName = "root";
  const password = "Amit@2001";
  const database = "symphome_development";
  const dialect = "mysql";

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect: dialect,
    operatorsAliases: false,
    options: {
      encrypt: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.tasks = require("../model/task.model")(sequelize, DataTypes, Model);
  db.users = require("../model/user.model")(sequelize, DataTypes, Model);
  return db;
};


function getConnection() {
  console.log("-----getting connection-----");
  return db;
}

module.exports = {
  initializeConnection,
  getConnection
};
