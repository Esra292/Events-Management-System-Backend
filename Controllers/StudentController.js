const {validationResult, body}=require("express-validator");
const res = require("express/lib/response");
const Student=require("./../Models/studentModel"); 

const bcrypt=require("bcrypt");

module.exports.getAllStudents=(request,response,next)=>{
    console.log(request.Role);
    Student.find({})
        .then((data)=>{
            response.status(200).json(data);
        })
        .catch(error=>{
            next(error);
        })
}
module.exports.StudentById=(request,response,next)=>{
    Student.findById(request.params.id)
    .then((data)=>{
        if(data==null)
        throw new Error("Student doesn't exist");
        response.status(200).json(data);
    })
    .catch((error)=>{
        next(error)
    })
}
module.exports.createStudent=async (request,response,next)=>{
    let result=validationResult(request);
    if(!result.isEmpty()){
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        console.log(message);
        throw(error);
    }
    try{
        const salt=await bcrypt.genSalt()
        const hashpassword=await bcrypt.hash(request.body.Password,salt)
        console.log(salt)
        console.log(hashpassword)
        let student=new Student({
            _id:request.body._id,
            Email:request.body.Email,
            Password:hashpassword,
        });
        student.save()
            .then((data)=>{
                response.status(201).json({message:"Student Created",data});
            })
            .catch((error)=>{
                next(error);
            })
    
    }
    catch{
        response.status(500).json({message:"Error occured"})
    }
    
    console.log(request.body);
}
module.exports.updateStudent=async (request,response,next)=>{
    console.log(request.body._id)
    const salt=await bcrypt.genSalt()
    const hashpassword=await bcrypt.hash(request.body.Password,salt)
    Student.updateOne({_id:request.body._id},{
        $set:{
            Email:request.body.Email,
            Password:hashpassword
        }
    })
    .then((data)=>{
        console.log(data)
        if(data.modifiedCount==0){
            throw new Error("Student doesn't exist");
        }
        response.status(200).json({message:"Student Updated",data});
    })
    .catch((error)=>{
        console.log(error)
        next(error);
    })
    }

module.exports.deleteStudent=(request,response,next)=>{
    Student.findByIdAndDelete(request.params.id)
           .then((data)=>{
            if(data==null)
                throw new Error("Student doesn't exist")
                response.status(200).json({message:"Student deleted"})        
           }) 
           .catch((error)=>{
                next(error)
           })
}