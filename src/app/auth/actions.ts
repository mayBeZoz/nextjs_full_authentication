"use server"

import { connectDB } from "@/lib/db-connection"
import { registerSchema } from "@/lib/schemas"
import { generateAccessToken, generateRefreshToken } from "@/lib/utils"
import { UserModel } from "@/models/user"
import { IUser, IUserDocument } from "@/types"
import { compare, hash } from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function loginAction ( email:string, password:string ) {
    await connectDB()

    const user = await UserModel.findOne({ email })

    if (user) {
        const isPwdValid = await compare(password,user.password)
        if (isPwdValid){

            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            const cookieStore = await cookies()

            cookieStore.set("access_token",accessToken)
            cookieStore.set("refresh_token",refreshToken)

            redirect('/')
        }
    }

    return {
        success:false,
        message:"user with this credentials is not found",
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
                    verified:false,
                    email:user.email
                }
            }
        }else {

            return {
                success:false,
                message:"user with this email already exists, verify your account",
                data:{
                    verified:true,
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
        newUser.set_verification_otp(10 * 60 * 1000)
        

        return {
            success:true,
            message:"your account is created successfully",
            data:null
        }

    }catch {
        return {
            success:false,
            message:"server error while user registration, please try again",
            data:null
        }
    }
    
}