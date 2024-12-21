import { UserModel } from "@/models/user";
import { IUser } from "@/types";

export async function getUserById (userId: string) {

  const user = await UserModel.findById(userId)
  .lean<IUser>()
  .select("-verification_otp -reset_password_otp -verified -password")

  return user
}