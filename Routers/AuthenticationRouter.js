const express=require("express");
const{body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/AuthenticationController")

router.post("/login",controller.login);

module.exports=router;