import { Document } from "mongoose"
import { USER_ROLES } from "./lib/constant"

declare type TChildren = {
    readonly children : React.ReactNode
}

declare interface IUser {
    email:                  string,
    password:               string,
    first_name:             string,
    last_name:              string,
    verified:               boolean,
    verification_otp:       string,
    reset_password_otp:     string,
    role:                   USER_ROLES,
    _id:                    string
}

interface IUserDocument extends IUser,Document {
    set_verification_otp(ms: number): void;
    set_reset_password_otp(ms: number): void;
}

