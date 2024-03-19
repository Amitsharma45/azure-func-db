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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming password is always required
        comment: "Hashed password",
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
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
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name
      tableName: "users", // Optional: Specify the table name
      timestamps: true,
      updatedAt: "updatedAt", // Specify the name of the updatedAt field
      hooks: {
        beforeUpdate: (user, options) => {
          user.updatedAt = new Date(); // Update updatedAt to current datetime
        },
      },
    }
  );

  return User;
};
