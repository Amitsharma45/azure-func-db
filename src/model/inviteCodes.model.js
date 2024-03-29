module.exports = (sequelize, DataTypes, Model) => {
  class InviteCode extends Model {}

  InviteCode.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "communities",
          key: "id",
        },
      },
      teachers_invite_code: {
        type: DataTypes.STRING(6),
        allowNull: true,
        unique: true,
      },
      students_invite_code: {
        type: DataTypes.STRING(6),
        allowNull: true,
        unique: true,
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
      modelName: "invite_codes",
      tableName: "invite_codes",
    }
  );

  return InviteCode;
};
