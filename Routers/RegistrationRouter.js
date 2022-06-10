const express=require("express");
const{body,param,query}=require("express-validator");
const mongoose=require("mongoose");

const router=express.Router();
const controller=require("./../Controllers/RegistrationController");



router.post('/register/student',controller.stregister);
router.post("/register/speaker",controller.spregister);

module.exports=router;