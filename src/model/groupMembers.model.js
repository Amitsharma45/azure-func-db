module.exports = (sequelize, DataTypes, Model) => {
  class GroupMember extends Model {}

  GroupMember.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      group_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "community_members",
          key: "id",
        },
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groups",
          key: "id",
        },
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
      modelName: "group_members",
      tableName: "group_members",
    }
  );

  return GroupMember;
};
