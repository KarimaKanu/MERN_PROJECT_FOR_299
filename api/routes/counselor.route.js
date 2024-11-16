import express from 'express'
import { counselorSignin, counselorSignout, counselorSignup } from '../controllers/counselor.controller.js';
const router = express.Router();


router.post("/counselorSignin", counselorSignin);
router.post("/counselorSignup", counselorSignup);
router.get('/adminSignout', counselorSignout);

//router.post("/registration", registration);


export default router;