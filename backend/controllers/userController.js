const User = require("../models/userModel");
// Login
const loginUser = async (req, res) => {
  res.json({ message: "Login" });
};

// Signin
const signinUser = async (req, res) => {
  res.json({ message: "Signin" });
};

module.exports = { loginUser, signinUser };
