import express from 'express'
import { adminSignin, adminSignup } from '../controllers/admin.controller.js';

const router = express.Router();


router.post("/adminSignin", adminSignin);
router.post("/adminSignup", adminSignup);

//router.post("/registration", registration);


export default router;