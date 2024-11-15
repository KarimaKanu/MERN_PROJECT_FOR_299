import express from 'express'
import { counselorSignin, counselorSignup } from '../controllers/counselor.controller.js';
const router = express.Router();


router.post("/counselorSignin", counselorSignin);
router.post("/counselorSignup", counselorSignup);

//router.post("/registration", registration);


export default router;