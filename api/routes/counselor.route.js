import express from 'express'
import { assignSlotToClient, counselorSignin, counselorSignout, counselorSignup, generateWeeklySchedule, getCounselorSchedule, updateCounselor} from '../controllers/counselor.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post("/counselorSignin", counselorSignin);
router.post("/counselorSignup", counselorSignup);
router.get('/counselorSignout', counselorSignout);
router.post("/generate-schedule/:counselorId", generateWeeklySchedule);
router.get("/schedule/:counselorId", getCounselorSchedule);
router.post('/updateCounselor/:id', verifyToken, updateCounselor);

router.post("/assign-slot", assignSlotToClient);
//router.post("/registration", registration);


export default router;