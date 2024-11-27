//import Counselor from "../models/counselor.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
import Counselor from '../models/counselor.model.js';
import Schedule from '../models/schedule.model.js';
import User from '../models/user.model.js';







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
        .cookie('access_token', token, { httpOnly: true , expires: expiryDate})
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };




  export const counselorSignup = async (req, res, next) =>
    {
        const { username, email, password, name, age, gender, experience, feesPerConsultation, status, timings, specialization,  maritalStatus, contactNo, emergencyNo, address } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new Counselor({username, email, password:hashedPassword, name, age, gender, experience, feesPerConsultation, status, timings, specialization, maritalStatus, contactNo, emergencyNo, address});
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
    res.clearCookie('access_token').status(200).json('Signout Success ');
  };


  export const updateCounselor = async (req, res, next) => {
    console.log(req.user.id, req.user.id === req.params.id);
    if (req.user.id !== req.params.id) {
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
    
    console.log(req.user.id, req.user.id === req.params.id);
    
    if (req.user.id !== req.params.id) {
         console.log(req.user.id, req.user.id === req.params.id);
      return next(errorHandler(401, 'You can delete only your account!'));
    }

    try {
      await Counselor.findByIdAndDelete(req.params.id);
      return res.status(200).json('User has been deleted...');
    } catch (error) {
        console.log(error);
        // next(error);
    }
  //.clearCookie('access_token')
  };


//  export const getCounselorByIdController = async (req, res) => {
//     try {
//       const counselor = await Counselor.findOne({ _id: req.body.counselorId }); // Use `req.query` instead of `req.body`
      
//       res.status(200).send({
//         success: true,
//         message: "Single Counselor Info Fetched",
//         data: counselor,
//       });
      
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         success: false,
//         error,
//         message: "Error fetching single counselor info",
//       });
//     }
//   };
  
export const getCounselorByIdController = async (req, res) => {
  try {
    const { counselorId } = req.query; // Read from query parameters

    if (!counselorId) {
      return res.status(400).send({
        success: false,
        message: "Counselor ID is required",
      });
    }

    const counselor = await Counselor.findById(counselorId);

    if (!counselor) {
      return res.status(404).send({
        success: false,
        message: "Counselor not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Counselor Info Fetched",
      data: counselor,
    });
  } catch (error) {
    console.error("Error fetching single counselor info:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error fetching single counselor info",
    });
  }
};
﻿
