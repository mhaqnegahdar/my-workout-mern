import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
if (!refreshSecret || !accessSecret) {
  throw new Error("Missing Secrets environment variables");
}

// Generate auth token
export const generateAuthToken = (userId: ObjectId) => {
  return jwt.sign({ userId }, accessSecret, {
    expiresIn: "60m",
  });
};

// Generate refresh token
export const generateRefreshToken = (userId: ObjectId) => {
  return jwt.sign({ userId }, refreshSecret, {
    expiresIn: "7d",
  });
};
