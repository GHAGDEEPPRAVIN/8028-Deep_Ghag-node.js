import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username:String,
    email:String,
    name:String,
    password:String,
    confirm_password:String,
    status:{type:Boolean,default:true},
},{timestamps:true});

export const adminModel = mongoose.model("admin",adminSchema)