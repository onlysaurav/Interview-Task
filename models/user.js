import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    refferal_bonus:{type:Number},
    code:{type:String,default:uuidv4},
    refferal_code:{type:String},
    parent_user:{type:String},
    children_user:{type:String},
    password:{type:String,required:true},
    children_user:{type:Boolean},
    total_children:{type:Number}

})
const UserModel = new mongoose.model("user", userSchema)
export default UserModel;