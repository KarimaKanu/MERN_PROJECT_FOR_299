import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsCounselor, changeAvailability, counselorList, counselorSignin, counselorSignout, counselorSignup, deleteCounselor,  updateCounselor} from '../controllers/counselor.controller.js';
//import { verifyToken } from '../utils/verifyUser.js';
import { verifyTokenC } from '../utils/verifyCounselor.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


router.post("/counselorSignin", counselorSignin);
router.post("/counselorSignup", counselorSignup);
router.get('/counselorSignout', counselorSignout);
router.post('/updateCounselor/:id', verifyTokenC, updateCounselor);
router.delete('/deleteCounselor/:id', verifyTokenC, deleteCounselor);
router.get('/list', counselorList);
router.get('/appointments', verifyTokenC, appointmentsCounselor);
router.post("/cancel-appointment", verifyTokenC, appointmentCancel);
router.post("/complete-appointment", verifyTokenC, appointmentComplete);
//Check this one admin route or normal route






export default router;