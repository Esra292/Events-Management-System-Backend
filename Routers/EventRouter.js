const express=require("express");
const{body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/EventController")

router.route("/Event")
.get(/*AuthMw,*/controller.getAllEvents)
.post(controller.createEvent)
.put(/*AuthMw,*/controller.updateEvent)
.delete(/*AuthMw,*/controller.deleteEvent)


router.get("/Event/:id",/*AuthMw,*/controller.EventById)
router.delete("/Event/:id",/*AuthMw,*/controller.deleteEvent)

module.exports=router;