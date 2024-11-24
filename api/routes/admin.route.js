import express from 'express'
import { adminSignin, adminSignup, fetchClients, fetchCounselors, adminSignout, updateAdmin } from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


router.post("/adminSignin", adminSignin);
router.post("/adminSignup", adminSignup);
router.get("/clients", fetchClients);
router.get("/counselors", fetchCounselors);
router.get('/adminSignout', adminSignout);
router.post('/updateAdmin/:id', verifyToken, updateAdmin);



export default router;