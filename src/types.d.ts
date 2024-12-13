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
    verification_otp:       string|null,
    reset_password_otp:     string|null,
    role:                   USER_ROLES,
    _id:                    string
}

interface IUserDocument extends IUser,Document {}


type TUserRoleValue = `${USER_ROLES}`

type TAccessTokenPayload = {
    user_id:        string,
    email:          string,
    role:           TUserRoleValue
}