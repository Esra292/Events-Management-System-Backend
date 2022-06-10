const {validationResult, body}=require("express-validator");
const res = require("express/lib/response");
const Speaker=require("./../Models/SpeakerModel"); 
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


module.exports.getAllSpeakers=(request,response,next)=>{
    Speaker.find({})
        .then((data)=>{
            response.status(200).json(data);
        })
        .catch(error=>{
            next(error);
        })
}
module.exports.SpeakerById=(request,response,next)=>{
    Speaker.findById(request.params.id)
            .then((data)=>{
                if(data==null)
                throw new Error("Speaker doesn't exist");
                response.status(200).json(data);
            })
            .catch((error)=>{
                next(error)
            })
}
module.exports.createSpeaker=async (request,response,next)=>{
    let result=validationResult(request);
    if(!result.isEmpty()){
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        console.log(message);
        throw(error);
    }
    try{
        const salt=await bcrypt.genSalt();
        const hashpassword=await bcrypt.hash(request.body.Password,salt);
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
            .catch((error)=>{
                next(error);
            })
    
        console.log(request.body);
    }
    catch{

    }
    
}
module.exports.updateSpeaker=async (request,response,next)=>{
    const salt=await bcrypt.genSalt()
    const hashpassword=await bcrypt.hash(request.body.Password,salt)
    Speaker.updateOne({_id:request.body._id},{
        $set:{
            Email:request.body.Email,
            UserName:request.body.UserName,
            Password:hashpassword,
            City:request.body.City,
            Street:request.body.Street,
            Building:request.body.Building,
        }
    })
    .then((data)=>{
        if(data.modifiedCount==0)
        throw new Error("Speaker doesn't exist");
        response.status(200).json({message:"Speaker Updated",data});
    })
    .catch((error)=>{
        next(error);
    })
    }

module.exports.deleteSpeaker=(request,response,next)=>{
    Speaker.findByIdAndDelete(request.params.id)
           .then((data)=>{
            if(data==null)
                throw new Error("Speaker doesn't exist")
                response.status(200).json({message:"Speaker deleted"})        
           }) 
           .catch((error)=>{
                next(error)
           })
}