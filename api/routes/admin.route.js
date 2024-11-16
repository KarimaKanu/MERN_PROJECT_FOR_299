import express from 'express'
import { adminSignin, adminSignup, fetchClients, fetchCounselors } from '../controllers/admin.controller.js';


const router = express.Router();


router.post("/adminSignin", adminSignin);
router.post("/adminSignup", adminSignup);
router.get("/clients", fetchClients);
router.get("/counselors", fetchCounselors);



export default router;