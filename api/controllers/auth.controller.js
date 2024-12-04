import User from "../models/user.model.js";
import Counselor from "../models/counselor.model.js";
import Admin from "../models/admin.model.js";




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

 


// export const signin = async (req, res, next) => {
//   const { email, password } = req.body; // No role in the request body
//   try {
//     // Check in User collection
//     let validEntity = await User.findOne({ email });
//     let entityType = 'User';

//     // If not found in User, check in Counselor collection
//     if (!validEntity) {
//       validEntity = await Counselor.findOne({ email });
//       entityType = 'Counselor';
//     }


//     // If not found in Counselor, check in Admin collection
//     if (!validEntity) {
//       validEntity = await Admin.findOne({ email });
//       entityType = 'Admin';
//     }

//     // If not found in either collection
//     if (!validEntity) {
//       return next(errorHandler(404, 'Account not found'));
//     }

//     // Validate password
//     const validPassword = bcryptjs.compareSync(password, validEntity.password);
//     if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

//     // Generate JWT token
//     const token = jwt.sign({ id: validEntity._id, type: entityType }, '299'); // Include type in token
//     const { password: hashedPassword, ...rest } = validEntity._doc;

//     // Set cookie expiry (1 hour)
//     const expiryDate = new Date(Date.now() + 36000);

//     // Respond with cookie and entity details
//     res
//       .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error); // Pass unexpected errors to the error handler
//   }
// };









export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check in User collection
    let validEntity = await User.findOne({ email });
    let entityType = 'User';

    // If not found in User, check in Counselor collection
    if (!validEntity) {
      validEntity = await Counselor.findOne({ email });
      entityType = 'Counselor';
    }

    // If not found in Counselor, check in Admin collection
    if (!validEntity) {
      validEntity = await Admin.findOne({ email });
      entityType = 'Admin';
    }

    // If not found in any collection
    if (!validEntity) {
      return next(errorHandler(404, 'Account not found'));
    }

    // Validate password
    const validPassword = bcryptjs.compareSync(password, validEntity.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

    // Generate JWT token
    const token = jwt.sign({ id: validEntity._id, type: entityType }, '299'); // Include type in token
    const { password: hashedPassword, ...rest } = validEntity._doc;

    // Send the token in the JSON response
    res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }); // 1-hour expiration
    res.status(200).json({ ...rest, token })
    
  } catch (error) {
    next(error); // Pass unexpected errors to the error handler
  }
};

  
  export const signout =(req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout Success ');
  };

  