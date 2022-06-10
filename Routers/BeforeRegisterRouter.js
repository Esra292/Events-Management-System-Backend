const express=require("express");
const{body,param,query}=require("express-validator");

const router=express.Router();
const controller=require("./../Controllers/BeforeRegisterController");


module.exports=router;