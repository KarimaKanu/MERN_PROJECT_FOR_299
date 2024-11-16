import express from 'express'
import { adminSignin, adminSignup, fetchClients, fetchCounselors, adminSignout } from '../controllers/admin.controller.js';


const router = express.Router();


router.post("/adminSignin", adminSignin);
router.post("/adminSignup", adminSignup);
router.get("/clients", fetchClients);
router.get("/counselors", fetchCounselors);
router.get('/adminSignout', adminSignout);



export default router;