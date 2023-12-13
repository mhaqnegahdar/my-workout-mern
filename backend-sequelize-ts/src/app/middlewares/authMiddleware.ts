import { AuthMiddleware } from "types/controllers/type";

import jwt from "jsonwebtoken";
import User from "../../app/models/userModel";
import { col } from "sequelize";

const requireAuth: AuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const _id = typeof decodedToken === "string" ? null : decodedToken._id;

    req.user = await User.findOne({
      where: { id: _id },
      attributes: [[col("id"), "_id"]],
    });

    next();
  } catch (error) {
    console.log('Auth Middleware Error: ',error);
    res.status(401).json({ error: error.message });
  }
};

export default requireAuth;
