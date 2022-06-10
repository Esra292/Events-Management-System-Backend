const Student=require("./../Models/studentModel")
const Speaker=require("./../Models/SpeakerModel")
const Event=require("./../Models/eventModel")

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const req = require("express/lib/request");


module.exports.login=((request,response,next)=>{
    if(request.body.UserName=="AdminName" && request.body.Password=="AdminPassword"){
        let token;
        token=jwt.sign({
            _id:mongoose.Types.ObjectId(),
            Email:request.body.Email,
            Role:"Admin",  
        },"MyNameIsAdmin",
        {expiresIn:"200h"});
        response.status(200).json({message:"Admin",token})
    }
    else{
        Student.findOne({Email:request.body.UserName})
                .then((user)=>{
                    console.log(request.body.UserName);
                    if(user != null && bcrypt.compareSync(request.body.Password,user.Password)){
                        let token;
                        token=jwt.sign({
                            _id:request.body._id,
                            Email:request.body.Email,
                            Role:"Student",  
                        },"MyNameIsAdmin",
                        {expiresIn:"200h"});
                        response.status(200).json({message:"Student",user,token})
                    }
                    else{
                                Speaker.findOne({UserName:request.body.UserName})
                                .then((user)=>{
                                    if(user != null && bcrypt.compare(request.body.Password,user.Password)){
                                        let token;
                                        token=jwt.sign({
                                            _id:request.body._id,
                                            Email:request.body.Email,
                                            Role:"Speaker",  
                                        },"MyNameIsAdmin",
                                        {expiresIn:"200h"});
                                        response.status(200).json({message:"Speaker",user,token})
                                    }
                                    else{
                                        throw new Error("Username or Password isn't correct")
                                    }
                                })
                                .catch((error)=>{
                                    next(error)
                                })
                    }
                })
                .catch((error)=>{
                    next(error)
                })
    }
    
})