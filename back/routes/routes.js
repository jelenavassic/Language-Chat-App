import express from "express";
import { singin, signup, allusers, getimg, getUser, editUser,postPhoto,deleteUser } from "../controller/user.js";
import multer from "multer";
import { getAllMessages } from "../controller/chat.js";
import { getMessages } from "../controller/chat.js";

 
var upload  = multer();

 
const router = express.Router();

router.post("/singup", signup);
router.post("/singin", singin);
router.get("/AllUsers", allusers);
router.get("/images/:id",getimg)
router.get("/user/:id", getUser)
router.put("/edit/:id", editUser)
router.post("/photos/:id", upload.single('file'),postPhoto)
router.delete("/user/:id", deleteUser)
router.get("/messages/:conversationId", getMessages)
router.get("/messages", getAllMessages)


export default router;

