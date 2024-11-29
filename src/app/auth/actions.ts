"use server"

import { generateAccessToken, generateRefreshToken } from "@/lib/utils"
import { UserModel } from "@/models/user"
import { IUser, IUserDocument } from "@/types"
import { compare, hash } from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function loginAction ( email:string, password:string ) {
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

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

const registerSchema = z.object({
    email:z.string({
        required_error:"user email is required"
    }).email().min(6,"user email must be at least 6 characters"),
    password:z.string({
        required_error:"user password is required"
    }).regex(passwordRegex,"password must be at least 6 characters, include capital letter, number, special character"),
    first_name:z.string({
        required_error:"first name is required"
    }).min(3,"first name must be at least 3 characters"),
    last_name:z.string({
        required_error:"last name is required"
    }).min(3,"last name must be at least 3 characters"),
}).strict("extra fields are not allowed")

type TRegisterPayload = z.infer<typeof registerSchema>

export async function registerAction (payload:TRegisterPayload) {
    const user = await UserModel.findOne({ email: payload.email }).lean<IUser>()

    if (user) {
        if (user.verified) {
            setTimeout(() => {
                redirect('/auth/login')
            }, 0);
            return {
                success:false,
                message:"user with this email already exists, login to your account",
                data:null
            }
        }else {
            setTimeout(() => {
                redirect(`/auth/verify-account/${user._id}`)
            }, 0);
            return {
                success:false,
                message:"user with this email already exists, verify your account",
                data:null
            }
        }
    }
    

    const { success, error } = registerSchema.safeParse(payload)

    if (!success) 
    return {
        success:false,
        message:error?.message,
        data:null
    }
    
    try {
        const hashedPassword = await hash(payload.password,12)
        const newUser:IUserDocument = await UserModel.create({
            ...payload,
            password:hashedPassword
        })
        newUser.set_verification_otp(10 * 60 * 1000)
        
        setTimeout(() => {
            redirect(`/auth/verify-account/${newUser._id}`)
        }, 0);

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