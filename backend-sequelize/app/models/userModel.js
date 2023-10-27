const sequelize = require("../../config/databese");
const bcrypt = require("bcrypt");

const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static async authenticateByEmailAndPassword(email, password) {
    const user = await this.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}

User.init(
  {
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
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 12);
        this.setDataValue("password", hashedPassword);
      },
    },
  },
  {
    sequelize,
    modelName: "wk_User",
   
  }
);

module.exports = User;
