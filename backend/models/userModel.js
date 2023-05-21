const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static Signup function
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All the fields must be filled in");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email!");
  }
  if (
    !validator.isStrongPassword(password, { minUppercase: 0, minSymbols: 0 })
  ) {
    throw Error("Please enter a strong password!");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("This user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashPass });

  return user;
};

// static login function
userSchema.statics.login = function (email, password) {
  if (!email || !password) {
    throw Error("All the fields must be filled in");
  }

  const user = this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
