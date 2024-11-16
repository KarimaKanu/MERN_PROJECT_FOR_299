//import Counselor from "../models/counselor.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";
import Counselor from '../models/counselor.model.js';


export const counselorSignup = async (req, res, next) =>
    {
        const { username, email, password, name, age, gender, maritalStatus, contactNo, emergencyNo, address } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new Counselor({username, email, password:hashedPassword, name, age, gender, maritalStatus, contactNo, emergencyNo, address});
        try{
            await newUser.save();
            res.status(201).json({message:"Counselor created successfully"});
    
        }
        catch(error){
            next(error);
        }
        //console.log(req);
    };

export const counselorSignin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await Counselor.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'Counselor not found'));
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
  export const counselorSignout =(req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout Success ');
  };
  