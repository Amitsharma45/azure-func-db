module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init(
    {
      // Model attributes are defined here
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming password is always required
        comment: "Hashed password",
      },
      access_level: {
        type: DataTypes.STRING,
        comment: "User access level: Teacher/Student",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: "users", // We need to choose the model name
      tableName: "users", // Optional: Specify the table name
    }
  );

  return User;
};
