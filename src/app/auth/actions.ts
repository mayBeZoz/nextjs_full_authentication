"use server"

import { connectDB } from "@/lib/db-connection"
import { registerSchema, verifyAccountSchema } from "@/lib/schemas"
import { generateAccessToken, generateOTP, sendEmail } from "@/lib/utils"
import { UserModel } from "@/models/user"
import { IUser, IUserDocument } from "@/types"
import { compare, hash } from "bcrypt"
import { cookies } from "next/headers"
import { z } from "zod"

type TLoginPayload = {
    email: string,
    password: string
}

export async function loginAction (payload: TLoginPayload) {
    await connectDB()

    const { email, password } = payload

    const user: IUserDocument|null = await UserModel.findOne({ email })

    if (user) {
        if (user.verified) {
            const isPwdValid = await compare(password,user.password)
            if (isPwdValid){

                const accessToken = generateAccessToken(user)

                const cookieStore = await cookies()
                const isProduction = process.env.NODE_ENV === 'production';

                cookieStore.set("access_token", accessToken, { httpOnly:true, secure:isProduction })

                return {
                    success:true,
                    message:"Logged In Successfully",
                    data:null
                }
            }
        }else {
            return {
                success:false,
                message:"Your Account Is Not Activated",
                data:{
                    verified:false,
                    email:user.email
                }
            }
        }
    }

    return {
        success:false,
        message:"User With This Credentials Is Not Found",
        data:null
    }

}


type TRegisterPayload = z.infer<typeof registerSchema>

export async function registerAction (payload:TRegisterPayload) {
    await connectDB()

    const user = await UserModel.findOne({ email: payload.email }).lean<IUser>()

    if (user) {
        if (user.verified) {
            return {
                success:false,
                message:"user with this email already exists, login to your account",
                data:{
                    verified:true,
                    email:user.email
                }
            }
        }else {
            return {
                success:false,
                message:"user with this email already exists, verify your account",
                data:{
                    verified:false,
                    email:user.email
                }
            }
        }
    }
    

    const { success, error } = registerSchema.safeParse(payload)

    if (!success) 
    return {
        success:false,
        message:error?.message,
        data:null,
    }
    
    try {
        const hashedPassword = await hash(payload.password,12)
        const newUser:IUserDocument = await UserModel.create({
            ...payload,
            password:hashedPassword
        })

        return {
            success:true,
            message:"your account is created successfully",
            data:{
                verified:false,
                email:newUser.email
            }
        }

    }catch {
        return {
            success:false,
            message:"server error while user registration, please try again",
            data:null
        }
    }
    
}



export async function sendVerificationEmailAction (userEmail:string) {
    await connectDB()

    const user: IUserDocument|null = await UserModel.findOne({ email: userEmail })

    if (!user) {
        return {
            success:false,
            message:"User With This Email Is Not Found",
            data:null
        }
    }

    if (user.verified) {
        return {
            success:false,
            message:"User Account Is Already Activated",
            data:{
                verified:true
            }
        }
    }

    const ms = 10 * 60 * 1000
    const otp = generateOTP()
    user.verification_otp = otp
    await user.save()
    setTimeout(()=>{
        user.verification_otp = null
        user.save()
    },ms)

    const isSuccess = sendEmail(userEmail,otp)
    if (isSuccess) {
        return {
            success:true,
            message:"verification email sent successfully",
            data:null
        }
    }
    

    return {
        success:false,
        message:"error occur please try again",
        data:null
    }
}

type TAccountVerificationPayload = z.infer<typeof verifyAccountSchema>
export async function submitVerificationOTPAction(payload:TAccountVerificationPayload) {

    await connectDB()

    const user: IUserDocument|null = await UserModel.findOne({ email: payload.email })

    if (!user) {
        return {
            success:false,
            message:"User With This Email Is Not Found",
            data:null
        }
    }
    
    if (user.verified) {
        return {
            success:false,
            message:"User Account Is Already Activated",
            data:{
                verified:true
            }
        }
    }
    const { success, error } = verifyAccountSchema.safeParse(payload)

    if (!success) 
    return {
        success:false,
        message:error?.message,
        data:null,
    }
    const isOTPValid = payload.otp === user.verification_otp

    if (!isOTPValid) {
        return {
            success:false,
            message:"Invalid OTP",
            data:null
        }
    }
    
    user.verified = true
    user.verification_otp = null
    await user.save()

    return {
        success:true,
        message:"Your Account is Activated Successfully",
        data:null
    }
    
    
}