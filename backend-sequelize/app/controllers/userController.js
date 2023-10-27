const User = require("../models/userModel");
const validator = require("validator");
const createToken = require("../../utils/jwtGenerator");

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.authenticateByEmailAndPassword(email, password);

    if (!user) {
      res.status(403).json({ error: "Access Denied" });
      return;
    }

    // jwt Token
    const userToken = createToken(user.id)

    res.status(200).json({email, token: userToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Singup
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  if (
    !validator.isStrongPassword(password, { minSymbols: 0, minUppercase: 0 })
  ) {
    res.status(400).json({ error: "Weak Password" });
    return;
  }
  try {
    const user = await User.create({ email, password });

    // JWT Token
    const userToken = createToken(user.id);

    res.status(200).json({ email, token: userToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
