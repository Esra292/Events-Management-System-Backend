const express=require("express");
const{body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/SpeakerController")

router.route("/Speaker")
.get(/*AuthMw,*/controller.getAllSpeakers)
.post(controller.createSpeaker)
.put(/*AuthMw,*/controller.updateSpeaker)
.delete(/*AuthMw,*/controller.deleteSpeaker)

router.get("/Speaker/:id",/*AuthMw,*/controller.SpeakerById)
router.delete("/Speaker/:id",/*AuthMw,*/controller.deleteSpeaker)

module.exports=router;