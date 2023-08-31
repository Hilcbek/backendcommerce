import mongoose from "mongoose";
let userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profile : {
        type : String,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
}, { timestamps : true });
export default mongoose.model('User', userSchema);