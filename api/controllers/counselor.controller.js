//import Counselor from "../models/counselor.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
import Counselor from '../models/counselor.model.js';

import User from '../models/user.model.js';
import appointmentModel from '../models/appointModel.js';







export const counselorSignin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await Counselor.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'Counselor not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, '299');
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token_c', token, { httpOnly: true , expires: expiryDate})
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };




  export const counselorSignup = async (req, res, next) =>
    {
        const { username, email, password, name, age, gender, experience, feesPerConsultation, status, timings, specialization,  maritalStatus, contactNo, emergencyNo, address, date, available, slots_booked, image, degree } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new Counselor({username, email, password:hashedPassword, name, age, gender, experience, feesPerConsultation, status, timings, specialization, maritalStatus, contactNo, emergencyNo, address, date, available, slots_booked, image, degree});
        try{
            await newUser.save();
            res.status(201).json({message:"Counselor created successfully"});
    
        }
        catch(error){
            next(error);
        }
        //console.log(req);
    };


  
  export const counselorSignout =(req,res)=>{
    res.clearCookie('access_token_c').status(200).json('Signout Success ');
  };


  export const updateCounselor = async (req, res, next) => {
    console.log(req.counselor.id, req.counselor.id === req.params.id);
    if (req.counselor.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await Counselor.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };


  export const deleteCounselor = async (req, res, next) => {
    
    console.log(req.counselor.id, req.counselor.id === req.params.id);
    
    if (req.counselor.id !== req.params.id) {
         console.log(req.counselor.id, req.counselor.id === req.params.id);
      return next(errorHandler(401, 'You can delete only your account!'));
    }

    try {
      await Counselor.findByIdAndDelete(req.params.id);
      return res.status(200).json('counselor has been deleted...');
    } catch (error) {
        console.log(error);
        // next(error);
    }
  //.clearCookie('_c')
  };


  export const counselorList = async (req, res) => {
    try {

        const doctors = await Counselor.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


const appointmentsCounselor = async (req, res) => {
  try {

      const { counselorId } = req.body
      const appointments = await appointmentModel.find({ counselorId })

      res.json({ success: true, appointments })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}



const changeAvailability = async (req, res) => {
  try {

      const { counselorId } = req.body

      const docData = await Counselor.findById(counselorId)
      await Counselor.findByIdAndUpdate(counselorId, { available: !docData.available })
      res.json({ success: true, message: 'Availability Changed' })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}



const appointmentCancel = async (req, res) => {
  try {

      const { counselorId, appointmentId } = req.body

      const appointmentData = await appointmentModel.findById(appointmentId)
      if (appointmentData && appointmentData.counselorId === counselorId) {
          await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
          return res.json({ success: true, message: 'Appointment Cancelled' })
      }

      res.json({ success: false, message: 'Appointment Cancelled' })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }

}



const appointmentComplete = async (req, res) => {
  try {

      const { counselorId, appointmentId } = req.body

      const appointmentData = await appointmentModel.findById(appointmentId)
      if (appointmentData && appointmentData.counselorId === counselorId) {
          await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
          return res.json({ success: true, message: 'Appointment Completed' })
      }

      res.json({ success: false, message: 'Appointment Cancelled' })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }

}








export {appointmentsCounselor, changeAvailability, appointmentCancel, appointmentComplete}