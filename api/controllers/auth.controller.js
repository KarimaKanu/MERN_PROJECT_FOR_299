import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res, next) =>
{
    const { username, email, password,name, age, gender, occupation, maritalStatus, contactNo, emergencyNo, address, educationMedium, upbringingPlace, extracurriculars, currentConcerns, receivedMentalHealthServices, takingPsychiatricMedication, selfCare, relationship, socialActivity, professional, groupActivity } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password:hashedPassword, name, age, gender, occupation, maritalStatus, contactNo, emergencyNo, address, educationMedium, upbringingPlace, extracurriculars, currentConcerns, receivedMentalHealthServices, takingPsychiatricMedication, selfCare, relationship, socialActivity, professional, groupActivity});
    try{
        await newUser.save();
        res.status(201).json({message:"User created successfully"});

    }
    catch(error){
        next(error);
    }
    
};

//  name, age, gender, occupation, maritalStatus, contactNo, emergencyNo, address, educationMedium, upbringingPlace, extracurriculars, currentConcerns, receivedMentalHealthServices, takingPsychiatricMedication


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found'));
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
  
  export const signout =(req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout Success ');
  };