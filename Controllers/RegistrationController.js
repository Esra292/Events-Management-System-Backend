const Student=require("./../Models/studentModel")
const Speaker=require("./../Models/SpeakerModel")
const Event=require("./../Models/eventModel")

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const req = require("express/lib/request");

const db=mongoose.connect("mongodb://localhost:27017/Project");

module.exports.stregister=(async(request,response,next)=>{
        
            const salt=await bcrypt.genSalt()
            const hashpassword=await bcrypt.hash(request.body.Password,salt)
            const role="std";
            let student=new Student({
                _id:request.body._id,
                Email:request.body.Email,
                Password:hashpassword,
            });
            student.save()
                    .then((user)=>{
                        response.status(201).send();
                    })
                    .catch((error)=>{
                        console.log(error);
                        next(error);
                    })
})
module.exports.spregister=(async(request,response,next)=>{
            const salt=await bcrypt.genSalt()
            const hashpassword=await bcrypt.hash(request.body.Password,salt)
            const role="spk";
            let speaker=new Speaker({
                _id:mongoose.Types.ObjectId(),
                Email:request.body.Email,
                UserName:request.body.UserName,
                Password:hashpassword,
                City:request.body.City,
                Street:request.body.Street,
                Building:request.body.Building,
            });
            speaker.save()
                .then((data)=>{
                    response.status(201).json({message:"Speaker Created",data});
                })
})