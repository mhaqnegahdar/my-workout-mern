const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const {col} = require("sequelize");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = await jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({where:{id:_id},attributes:[[col('id'),'_id']] });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};


module.exports = requireAuth