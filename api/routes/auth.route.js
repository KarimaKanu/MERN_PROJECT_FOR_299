import express from "express";

import { signup, signin, signout } from "../controllers/auth.controller.js"; 




const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
//router.post("/registration", registration);
router.get('/signout',signout);





export default router;