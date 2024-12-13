import { USER_ROLES } from "@/lib/constant";
import { IUserDocument } from "@/types";
import { model, models, Schema } from "mongoose";


const userSchema = new Schema<IUserDocument>({
    first_name:{
        required:true,
        type:String
    },
    last_name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String,
        min:6
    },
    verified:{
        default:false,
        type:Boolean
    },
    verification_otp:{
        type:String||null,
        default:null
    },
    reset_password_otp:{
        type:String||null,
        default:null
    },
    role:{
        default:USER_ROLES.USER,
        type:String,
    },
})

export const UserModel = models.User || model<IUserDocument>("User",userSchema)