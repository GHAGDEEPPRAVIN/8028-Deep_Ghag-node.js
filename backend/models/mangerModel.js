import mongoose from "mongoose";

const managerSchema = mongoose.Schema(
  {
    email:String,
    name: String,
    password: String,
    confirm_password: String,
    status: {type:Boolean,default:true},
    salary: String,
    designation: String,
  },
  { timestamps: true },
);

export const managerModel = mongoose.model("manager", managerSchema);
