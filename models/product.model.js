import mongoose from "mongoose"
let {Schema,model} = mongoose;
let productSchema = new Schema({
    title : { type : String, required : true, unique : true },
    desc : { type : String, required : true },
    img : { type : [String], required : true },
    catagories : { type : [String], required : true },
    size : { type : [String], required : true },
    color : { type : [String], required : true},
    price : { type : Number, required : true },
}, { timestamps : true })
export default model('product',productSchema);