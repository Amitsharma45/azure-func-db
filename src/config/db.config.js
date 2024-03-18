const { Sequelize, Model, DataTypes } = require("sequelize");
// const logger = require('../logger/api.logger');

const connect = () => {

    const hostName = "127.0.0.1"; 
    const userName = "root";
    const password = "Amit@2001";
    const database = "symphome_development";
    const dialect = "mysql";

    // const hostName = "onelabdbserver.database.windows.net"; 
    // const userName = "adminOnelab";
    // const password = "Onelab0504#";
    // const database = "onlabtestingdb";
    // const dialect = "mysql";

    console.log('dialect ', dialect)

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect: dialect,
        operatorsAliases: false,
        options: {
            encrypt: true
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.tasks = require("../model/task.model")(sequelize, DataTypes, Model);

    return db;

}

module.exports = {
    connect
}