const mongoose = require("mongoose");

const resveration =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    rdate:{
        type:String,
        required:true,
    },
    nog:{
        type:Number,
        required:true
    },
    rtime:{
        type:String,
        required:true
    },
    customer_id:{
        type:String,
        required:true
    }

})

//creating a collection
const Reserve = new mongoose.model("reserve",resveration);
module.exports=Reserve;