module.exports = (sequelize, DataTypes, Model) => {
  class InvitedUser extends Model {}

  InvitedUser.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      invited_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      invited_as: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "communities",
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
      modelName: "invited_users",
      tableName: "invited_users",
    }
  );

  return InvitedUser;
};
