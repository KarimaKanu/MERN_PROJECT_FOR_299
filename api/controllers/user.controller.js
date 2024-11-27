import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import Counselor from '../models/counselor.model.js';


export const test = (req, res) =>
{
    res.json({
        message: 'api is working',
    })
};
// delete user

export const deleteUser = async (req, res, next) => {
    
    console.log(req.user.id, req.user.id === req.params.id);
    
    if (req.user.id !== req.params.id) {
         console.log(req.user.id, req.user.id === req.params.id);
      return next(errorHandler(401, 'You can delete only your account!'));
    }

    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json('User has been deleted...');
    } catch (error) {
        console.log(error);
        // next(error);
    }
  //.clearCookie('access_token')
  };

  
  export const updateUser = async (req, res, next) => {
    console.log(req.user.id, req.user.id === req.params.id);
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
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

  export const getAllCounselor= async (req, res) => {
    try {
      const counselors = await Counselor.find({ status: "approved" });
      res.status(200).send({
        success: true,
        message: "Counselor Lists Fetched Successfully",
        data: counselors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error WHile Fetching Counselors",
      });
    }
  };
  
  