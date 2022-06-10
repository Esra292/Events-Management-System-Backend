const mongoose=require("mongoose");

let studentSchema=mongoose.Schema({
    _id:Number,
    Email:{type:String,unique:true},
    Password:String, 
});
module.exports=mongoose.model("Students",studentSchema);



