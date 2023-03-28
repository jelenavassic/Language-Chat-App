import express from "express";
import { singin, signup, allusers, getimg, getUser } from "../controller/user.js";



const router = express.Router();

router.post("/singup", signup);
router.post("/singin", singin);
router.get("/AllUsers", allusers);
router.get("/images/:id",getimg)
router.get("/user/:id", getUser)

export default router;
