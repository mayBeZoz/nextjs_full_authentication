import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IUserDocument, TAccessTokenPayload } from "@/types";
import { decode, sign } from "jsonwebtoken"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}



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


export function decodeAuthToken (token:string) {
    const payload = decode(token) as TAccessTokenPayload|null
    return payload 
}

export function sendEmail (email:string,payload:any):boolean {
    console.log('user otp: ',payload)
    return true
}