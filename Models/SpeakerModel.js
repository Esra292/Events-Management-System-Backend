const mongoose=require("mongoose");

let SpeakerSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    Email:{type:String,unique:true},
    UserName:String,
    Password:String,
    City:String,
    Street:String,
    Building:Number
});
module.exports=mongoose.model("Speakers",SpeakerSchema);