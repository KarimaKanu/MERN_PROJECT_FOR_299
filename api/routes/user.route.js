import express from "express";
import { test,updateUser,deleteUser, getAllCounselor, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay, paymentStripe, verifyStripe } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/getAllCounselor', getAllCounselor);
router.post('/book-appointment', verifyToken, bookAppointment);
router.get("/appointments", verifyToken, listAppointment);
router.post("/cancel-appointment", verifyToken, cancelAppointment);
router.post("/payment-razorpay", verifyToken, paymentRazorpay)
router.post("/verifyRazorpay", verifyToken, verifyRazorpay)
router.post("/payment-stripe", verifyToken, paymentStripe)
router.post("/verifyStripe", verifyToken, verifyStripe)

export default router;