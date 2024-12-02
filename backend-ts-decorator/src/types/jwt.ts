import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export function isDecodedJwtPayload(
  decoded: any
): decoded is JwtPayload & { userId: ObjectId } {
  return typeof decoded === "object" && decoded !== null && "userId" in decoded;
}
