import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Decorators
import Controller from "../../decorators/controller";
import Route from "../../decorators/route";
import ValidateBody from "../../decorators/validate-body";

// Schemas
import { userZod } from "../../types/models/user";
import { UserModel } from "../models/user";
import {
  generateAuthToken,
  generateRefreshToken,
} from "../../utils/jwt-tokens";
import { isDecodedJwtPayload } from "../../types/jwt";
import { ObjectId } from "mongoose";

// Models

@Controller("/user")
class User {
  @Route("post", "/login", [])
  @ValidateBody(userZod)
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      if (user && (await user.comparePassword(password))) {
        // Generate Tokens
        const authToken = generateAuthToken(user._id as unknown as ObjectId);
        const refreshToken = generateRefreshToken(
          user._id as unknown as ObjectId
        );

        res.status(200).json({ email: user.email, authToken, refreshToken });
      } else
        res
          .status(500)
          .json({ error: "Problem Loging In, Wrong username or password" });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  @Route("post", "/signup", [])
  @ValidateBody(userZod)
  async signup(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = new UserModel({ email, password });
      await user.save();

      // Generate Tokens
      const authToken = generateAuthToken(user._id as unknown as ObjectId);
      const refreshToken = generateRefreshToken(
        user._id as unknown as ObjectId
      );

      res.status(200).json({ email: user.email, authToken, refreshToken });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }

  @Route("post", "/refresh-token", [])
  async refreshAuthToken(req: Request, res: Response) {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);

    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshSecret) {
      throw new Error("Missing Refresh Secret environment variables");
    }

    jwt.verify(
      refreshToken,
      refreshSecret,
      (
        err: jwt.VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (err) return res.sendStatus(403);

        if (isDecodedJwtPayload(decoded)) {
          const newAuthToken = generateAuthToken(decoded.userId);
          res.json({ authToken: newAuthToken });
          return;
        }

        return res.sendStatus(403);
      }
    );
  }
}

export default User;
