module.exports = (sequelize, DataTypes, Model) => {
  class Feedback extends Model {}

  Feedback.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      feedback_note: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        references: {
          model: "communities",
          key: "id",
        },
      },
      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "groups",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "feedbacks",
      tableName: "feedbacks",
    }
  );

  return Feedback;
};
