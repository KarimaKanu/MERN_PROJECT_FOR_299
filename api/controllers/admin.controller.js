//import Counselor from "../models/counselor.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
import Admin from '../models/admin.model.js';
import User from '../models/user.model.js';
import Counselor from '../models/counselor.model.js';


export const adminSignup = async (req, res, next) =>
    {
        const { username, email, password, name, dob, contactNo,qualifications, emergencyNo, address } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new Admin({username, email, password:hashedPassword, name, dob, contactNo, qualifications, emergencyNo, address});
        try{
            await newUser.save();
            res.status(201).json({message:"Admin created successfully"});
    
        }
        catch(error){
            next(error);
        }
        //console.log(req);
    };

export const adminSignin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await Admin.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'Admin not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
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
  export const fetchClients = async (req, res, next) => {
    try {
      const clients = await User.find({ role: 3 }); // Fetch users with role 3
      res.status(200).json(clients);
      console.log(clients);
    } catch (error) {
      next(error);
    }
  };
  export const fetchCounselors = async (req, res, next) => {
    try {
      const clients = await Counselor.find({ role: 2 }); // Fetch users with role 3
      res.status(200).json(clients);
      console.log(clients);
    } catch (error) {
      next(error);
    }
  };
  export const adminSignout =(req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout Success ');
  };

  export const updateAdmin = async (req, res, next) => {
    console.log(req.user.id, req.user.id === req.params.id);
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await Admin.findByIdAndUpdate(
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

  export const deleteAdmin = async (req, res, next) => {
    
    console.log(req.user.id, req.user.id === req.params.id);
    
    if (req.user.id !== req.params.id) {
         console.log(req.user.id, req.user.id === req.params.id);
      return next(errorHandler(401, 'You can delete only your account!'));
    }

    try {
      await Admin.findByIdAndDelete(req.params.id);
      return res.status(200).json('User has been deleted...');
    } catch (error) {
        console.log(error);
        // next(error);
    }
  //.clearCookie('access_token')
  };
