import express from "express";
import { signup } from "../controller/user.js";
import { singin} from "../controller/user.js";
// import User from "../models/user.js";

const router = express.Router();

router.post("/singup", signup);
router.post("/singin", singin);
export default router;
