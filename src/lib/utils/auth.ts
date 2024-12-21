import { IUserDocument, TAccessTokenPayload } from "@/types"
import { decode, sign } from "jsonwebtoken"

export function generateAccessToken ( user: IUserDocument ) {
  const secret = process.env.ACCESS_TOKEN_SECRET as string

  return sign(
    {
      token_type:"access_token",
      user_id:user._id,
      email:user.email,
      role:user.role
    },
    secret,
    { 
      expiresIn:"15m"
    }
  )
}


export function decodeAuthToken (token:string) {
  const payload = decode(token) as TAccessTokenPayload|null
  return payload 
}