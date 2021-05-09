const mongoose =require("mongoose");

const itemSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    
    category:{
        type:String,
        required:true
    }
})

//creating a collection
const Item = new mongoose.model("item",itemSchema);
module.exports=Item;