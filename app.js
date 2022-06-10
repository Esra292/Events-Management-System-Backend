const express=require("express");
const body_parser=require("body-parser");
const mongoose=require("mongoose");
const cors=require("cors");
const jwt=require("jsonwebtoken");

////////////

const StudentRouter=require("./Routers/StudentRouter");
const SpeakerRouter=require("./Routers/SpeakerRouter");
const EventRouter=require("./Routers/EventRouter");
const AuthenticationRouter=require("./Routers/AuthenticationRouter");
const RegistrationRouter=require("./Routers/RegistrationRouter");
const BeforeRegisterRouter=require("./Routers/BeforeRegisterRouter")
const { json } = require("express/lib/response");
const router = require("./Routers/StudentRouter");

const server=express();

server.use(express.json());

// mongoose.connect('mongodb://localhost:27017/Project', function(err) {
//     console.log(err);
// });
mongoose.connect("mongodb://localhost:27017/Project")
        .then(()=>{
            console.log("DB connetcted");
            server.listen(process.env.PORT||8080,()=>{
                console.log("listening....");
            });
        })
        .catch(()=>{
            console.log("DB Connection failed")
        })
        


//logger MW
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));

server.use(cors());



router.use(BeforeRegisterRouter);
server.use(RegistrationRouter);
server.use(AuthenticationRouter);
server.use(StudentRouter);
server.use(SpeakerRouter);
server.use(EventRouter);

//Not Found MW      
server.use((request,response)=>{
    response.status(404).json({message:"Page is Not Found"});
});

//Error MW
server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""});
});


// server.use((req,res,next)=>{
//     // res.send("Hello again");
//     next();
// });
// server.use((req,res,next)=>{
//     if(true){
//         console.log("Success!")
//         next();
//     }
//     else{
//         next(new Error ("Not Authenticated"));
//     }
// });
// server.get("/home",(req,res,next)=>{
//     res.send("Home Page");
// });


// mongoose.connect("mongod://localhost:27017/Project")
//         .then(()=>{
//             console.log("DB connetcted")
//         })
//         .catch(()=>{
//             console.log("DB Connection failed")
//         })