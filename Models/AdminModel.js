const mongoose=require("mongoose");

let adminSchema=mongoose.Schema({
    UserName:"Admin",
    Password:"adminPassword",
    _id:1,
});

module.exports=mongoose.model("Admin",adminSchema);
