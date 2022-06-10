const {validationResult, body}=require("express-validator");
const res = require("express/lib/response");
const Event=require("./../Models/eventModel"); //3
const mongoose=require("mongoose");

module.exports.getAllEvents=(request,response,next)=>{
    Event.find({})
        .then((data)=>{
            response.status(200).json(data);
        })
        .catch(error=>{
            next(error);
        })
}
module.exports.EventById=(request,response,next)=>{
    Event.findById(request.params.id)
            .then((data)=>{
                if(data==null)
                throw new Error("Event doesn't exist");
                response.status(200).json(data);
            })
            .catch((error)=>{
                next(error)
            })
}
module.exports.createEvent=(request,response,next)=>{
    let result=validationResult(request);
    if(!result.isEmpty()){
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        console.log(message);
        throw(error);
    }
    let event=new Event({
        _id:mongoose.Types.ObjectId(),
        title:request.body.title,
        eventDate:request.body.eventDate,
        mainSpeakerId:request.body.mainSpeakerId,
        otherSpeakersIds:request.body.otherSpeakersIds,
        studentsIds:request.body.studentsIds,      
    });
    event.save()
        .then((data)=>{
            response.status(201).json({message:"Event Created",data});
        })
        .catch((error)=>{
            next(error);
        })

    console.log(request.body);
}
module.exports.updateEvent=(request,response,next)=>{
    Event.updateOne({_id:request.body._id},{
        $set:{
            title:request.body.title,
            eventDate:request.body.eventDate,
            mainSpeakerId:request.body.mainSpeakerId,
            otherSpeakersIds:request.body.otherSpeakersIds,
            studentsIds:request.body.studentsIds,  
        }
    })
    .then((data)=>{
        if(data.matchedCount==0)
        throw new Error("Event doesn't exist");
        response.status(200).json({message:"Event Updated",data});
    })
    .catch((error)=>{
        next(error);
    })
    }

module.exports.deleteEvent=(request,response,next)=>{
    Event.findByIdAndDelete(request.params.id)
           .then((data)=>{
            if(data==null)
                throw new Error("Event doesn't exist")
                response.status(200).json({message:"Event deleted"})        
           }) 
           .catch((error)=>{
                next(error)
           })
}