const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/restaurant",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`Connection Successfully`);
}).catch((e)=>{
    console.log(`no connection`);
})