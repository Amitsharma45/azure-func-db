module.exports = (sequelize, DataTypes, Model) => {
  class Lesson extends Model {}

  Lesson.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lesson_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      lesson_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
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
    },
    {
      sequelize,
      modelName: "lessons",
      tableName: "lessons",
    }
  );

  return Lesson;
};
