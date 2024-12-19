import { z } from "zod"

export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

export const registerSchema = z.object({
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

export const verifyAccountSchema = z.object({
    email:z.string({
        required_error:"user email is required"
    }).email(),
    otp: z.string({
        required_error:"otp is required"
    }).min(6,"otp must be at least 6 characters"),
})

export const resetPasswordSchema = z.object({
    email:z.string({
        required_error:"user email is required"
    }).email(),
    otp: z.string({
        required_error:"otp is required"
    }).min(6,"otp must be at least 6 characters"),
    password: z.string({
        required_error:"user password is required"
    }).regex(passwordRegex,"password must be at least 6 characters, include capital letter, number, special character"),
})