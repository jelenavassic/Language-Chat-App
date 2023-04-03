import express from "express";
import { singin, signup, allusers, getimg, getUser, editUser,postPhoto,deleteUser } from "../controller/user.js";
import multer from "multer";

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

export default router;

