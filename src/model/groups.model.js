module.exports = (sequelize, DataTypes, Model) => {
  class Group extends Model {}

  Group.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      group_name: {
        type: DataTypes.STRING(255),
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
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "communities",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "groups",
      tableName: "groups",
    }
  );

  return Group;
};
