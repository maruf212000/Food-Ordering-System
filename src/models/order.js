const mongoose =require("mongoose");

const orderSchema =new mongoose.Schema({
    Customer:{
        type:String,
        required:true
    },
    margherita:{
        type:Number,
        required:true
    },
    Formaggio:{
        type:Number,
        required:true
    },
    MeatTown:{
        type:Number,
        required:true
    },
    Lasagna:{
        type:Number,
        required:true
    },
    Ravioli:{
        type:Number,
        required:true
    },
    Spaghetti:{
        type:Number,
        required:true
    },
    TomatoSoup:{
        type:Number,
        required:true
    },
    Bruschetta:{
        type:Number,
        required:true
    },
    GarlicBread:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
})

//creating a collection
const Order = new mongoose.model("order",orderSchema);
module.exports=Order;