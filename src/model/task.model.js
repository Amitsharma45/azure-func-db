module.exports = (sequelize, DataTypes, Model) => {
  class Tasks extends Model {}

  Tasks.init(
    {
      // Model attributes are defined here
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      createdAt: {
        type: DataTypes.DATE,
        // allowNull defaults to true
      },
      updatedAt: {
        type: DataTypes.DATE,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "tasks", // We need to choose the model name
    }
  );

  return Tasks;
};
