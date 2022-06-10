const express=require("express");
const{body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/StudentController")
const AuthMw=require("./../MiddleWares/AuthMW");

router.route("/Student")
.get(/*AuthMw,*/controller.getAllStudents)
.post(controller.createStudent)
.put(/*AuthMw,*/controller.updateStudent)
.delete(/*AuthMw,*/controller.deleteStudent)


router.get("/Student/:id",/*AuthMw,*/controller.StudentById)
router.delete("/Student/:id",/*AuthMw,*/controller.deleteStudent)

module.exports=router;