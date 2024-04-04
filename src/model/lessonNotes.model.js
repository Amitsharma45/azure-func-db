module.exports = (sequelize, DataTypes, Model) => {
  class LessonNote extends Model {}

  LessonNote.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "lessons",
          key: "id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      multimedia_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lesson_date: {
        type: DataTypes.DATE,
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
    },
    {
      sequelize,
      modelName: "lesson_notes",
      tableName: "lesson_notes",
    }
  );

  return LessonNote;
};
