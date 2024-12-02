import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { isDecodedJwtPayload } from "../../types/jwt";

export const authenticateHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessSecret) {
    throw new Error("Missing Access Secret environment variables");
  }

  jwt.verify(
    token,
    accessSecret,
    (
      err: jwt.VerifyErrors | null,
      decoded: JwtPayload | string | undefined
    ) => {
      if (err) res.sendStatus(403); // Token is invalid

      if (isDecodedJwtPayload(decoded)) {
        req.user = decoded; // Store user information
      } else {
        res.sendStatus(403);
      }

      next();
    }
  );
};
