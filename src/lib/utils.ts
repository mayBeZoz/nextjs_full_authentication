import { IUserDocument } from "@/types";
import { sign } from "jsonwebtoken"


export function generateOTP(length = 6):string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

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


export function generateRefreshToken ( user: IUserDocument ) {
    const secret = process.env.REFRESH_TOKEN_SECRET as string

    return sign(
        {
            token_type:"refresh_token",
            user_id:user._id,
            email:user.email,
            role:user.role
        },
        secret,
        { 
            expiresIn:"30d"
        }
    )
}