import express from 'express'
import { adminSignin, adminSignup, fetchClients, fetchCounselors, adminSignout, updateAdmin, deleteAdmin, allDoctors, appointmentsAdmin, appointmentCancel } from '../controllers/admin.controller.js';
//import { verifyToken } from '../utils/verifyUser.js';
import {authAdmin} from '../utils/verifyAdmin.js';
import { changeAvailability } from '../controllers/counselor.controller.js';


const router = express.Router();


router.post("/adminSignin", adminSignin);
router.post("/adminSignup", adminSignup);
router.get("/clients", fetchClients);
router.get("/counselors", fetchCounselors);
router.get('/adminSignout', adminSignout);
router.post('/updateAdmin/:id', authAdmin, updateAdmin);
router.delete('/deleteAdmin/:id', authAdmin, deleteAdmin);
router.get("/all-doctors", authAdmin, allDoctors);
router.post("/change-availability", authAdmin, changeAvailability);
router.get("/appointments", authAdmin, appointmentsAdmin);
router.post("/cancel-appointment", authAdmin, appointmentCancel)




export default router;