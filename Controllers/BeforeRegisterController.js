const Student=require("./../Models/studentModel")
const Speaker=require("./../Models/SpeakerModel")
const Event=require("./../Models/eventModel")

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const req = require("express/lib/request");

const db=mongoose.connect("mongodb://localhost:27017/Project");

module.exports.choose=((request,response,next)=>{
    if(request.body.rol==student){
        request.body.Role=std;
    }
    else{
        request.body.Role=spk;
    }
})