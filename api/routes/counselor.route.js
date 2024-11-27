import express from 'express'
import { counselorSignin, counselorSignout, counselorSignup, deleteCounselor,  getCounselorByIdController,  updateCounselor} from '../controllers/counselor.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


router.post("/counselorSignin", counselorSignin);
router.post("/counselorSignup", counselorSignup);
router.get('/counselorSignout', counselorSignout);
router.post('/updateCounselor/:id', verifyToken, updateCounselor);
router.delete('/deleteCounselor/:id', verifyToken, deleteCounselor);
router.post('/getCounselorById', verifyToken, getCounselorByIdController);




export default router;