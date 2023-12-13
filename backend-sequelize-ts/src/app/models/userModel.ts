import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../../config/database";

interface UserAttributes {
  id: number;
  _id?: number;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  id!: number;
  email!: string;
  password!: string;

  static async authenticateByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: { msg: "Not a Valid Email" },
      },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(value: string) {
        const hashedPassword = bcrypt.hashSync(value, 12);
        this.setDataValue("password", hashedPassword);
      },
    },
  },
  {
    sequelize,
    modelName: "rwt_User",
  }
);

export default User;
