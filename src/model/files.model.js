module.exports = (sequelize, DataTypes, Model) => {
  class File extends Model {}

  File.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      association_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      association_type: {
        type: DataTypes.STRING(DataTypes.MAX),
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(DataTypes.MAX),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "files",
      tableName: "files",
    }
  );

  return File;
};
