import User from "../../app/models/userModel";
import validator from "validator";
import { ControllerFunction } from "../../types/controllers/type";
import { createToken } from "../../utils/jwtGenerator";

export const loginUser: ControllerFunction = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.authenticateByEmailAndPassword(email, password);

    if (!user) {
      res.status(403).json({ error: "Access Denied" });
      return;
    }

    const userToken = createToken(user.id);

    res.status(200).json({ email, token: userToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

export const signupUser: ControllerFunction = async (req, res, next) => {
  const { email, password } = req.body;

  if (
    !validator.isStrongPassword(password, { minUppercase: 0, minSymbols: 0 })
  ) {
    res.status(400).json({ error: "Weak Passsword" });
    return;
  }

  try {
    const user = await User.create({ email, password });

    const userToken = createToken(user.id);

    res.status(200).json({ email, token: userToken });
    return;
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};
