const { Sequelize, Model, DataTypes } = require("sequelize");
const db = {};

const initializeConnection = async () => {

  const hostName = process.env.hostName ;
  const userName = process.env.userRootName;
  const password = process.env.password;
  const database = process.env.database;
  
  
  const sequelize = new Sequelize(
    database,
    userName,
    password,
    {
      host: hostName,
      port: 1433,
      dialect: "mssql",
    }
  );
  
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

  return db;
};


function getConnection() {
  return db;
}

module.exports = {
  initializeConnection,
  getConnection
};
