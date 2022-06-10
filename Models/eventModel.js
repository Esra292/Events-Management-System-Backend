const { type } = require("express/lib/response");
const mongoose=require("mongoose");

let EventSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    title:{type:String,required:true},
    eventDate:Date,
    mainSpeakerId:{type:String,ref:"Speakers"},
    otherSpeakersIds:[{type:String,ref:"Speakers"}],
    studentsIds:[{type:Number,ref:"Students"}],
});

module.exports=mongoose.model("Events",EventSchema);