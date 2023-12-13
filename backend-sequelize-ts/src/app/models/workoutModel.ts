import sequelize from "../../config/database";
import { DataTypes, Model, Optional } from "sequelize";
import User from "../../app/models/userModel";

class Workout extends Model {}

Workout.init(
  {
    _id: {
      // Define '_id' as a virtual field that maps to 'id'
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id", // Map '_id' to the 'id' column
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    load: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "rwt_Workout", // Define a virtual field to rename 'id' to '_id'
  }
);

User.hasMany(Workout, {
  as: "rwt_Workouts",
  foreignKey: "user_id",
  sourceKey: "id",
});

Workout.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

export default Workout