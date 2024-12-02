import { model, Schema, Model } from "mongoose";
import { UserSchemaType, passwordSchema } from "../../types/models/user";
import bcrypt from "bcrypt";
type UserSchema = UserSchemaType & {
  comparePassword(password: string): Promise<boolean>;
};
interface UserModelType extends Model<UserSchema> {
  signup(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
}

const userSchema = new Schema<UserSchema>({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // is strong password
    const isStrongPassword = passwordSchema.safeParse(this.password);
    if (!isStrongPassword.success) {
      throw Error("Please enter a strong password!");
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    if (error instanceof Error) next(error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the model
export const UserModel = model<UserSchema, UserModelType>("User", userSchema);
