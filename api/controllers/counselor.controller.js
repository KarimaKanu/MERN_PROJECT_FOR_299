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


  
  export const counselorSignout =(req,res)=>{
    res.clearCookie('access_token').status(200).json('Signout Success ');
  };
  

  export const generateWeeklySchedule = async (req, res) => {
    try {
      const { counselorId } = req.params;
  
      // Check if the counselor exists
      const counselor = await Counselor.findById(counselorId);
      if (!counselor) {
        return res.status(404).json({ message: "Counselor not found" });
      }
  
      // Delete old schedule if necessary
      await Schedule.deleteMany({ counselor: counselorId });
  
      // Generate new schedule
      const timeSlots = [
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM",
        "5:00 PM - 6:00 PM",
      ];
  
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const schedules = days.map((day) => ({
        counselor: counselorId,
        day,
        slots: timeSlots.map((time, index) => ({
          time,
          isReservedForClient: index % 2 === 0, // Alternate slots reserved for clients
        })),
      }));
  
      await Schedule.insertMany(schedules);
  
      res.status(200).json({ message: "Weekly schedule generated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error generating schedule", error });
    }
  };

  export const getCounselorSchedule = async (req, res, next) => {
    try {
      const { counselorId } = req.params;
      const schedule = await Schedule.find({ counselor: counselorId });
      if (!schedule || schedule.length === 0) {
        return res.status(404).json({ message: "No schedule found for this counselor" });
      }
      res.status(200).json(schedule);
    } catch (error) {
      next(error); // Use error handling middleware
    }
  };

  



// export const assignSlotToClient = async (req, res) => {

//     try {
//       const { counselorUsername, clientUsername, slotId } = req.body;
  
//       // Find the counselor by their username (or use _id if that's preferred)
//       const counselor = await Counselor.findOne({ username: counselorUsername });
//       if (!counselor) {
//         return res.status(404).json({ message: "Counselor not found" });
//       }
  
//       // Find the schedule for this counselor
//       const schedule = await Schedule.findOne({ counselor: counselor._id });
//       if (!schedule) {
//         return res.status(404).json({ message: "No schedule found for this counselor" });
//       }
  
//       // Find the slot to assign to the client
//       const slot = schedule.slots.find((slot) => slot._id.toString() === slotId);
//       if (!slot) {
//         return res.status(404).json({ message: "Slot not found" });
//       }
  
//       // Check if the slot is already assigned to someone
//       if (slot.assignedTo) {
//         return res.status(400).json({ message: "Slot already assigned" });
//       }
  
//       // Assign the slot to the client
//       slot.assignedTo = clientUsername;
  
//       // Save the updated schedule
//       await schedule.save();
  
//       // Update the client's schedule (assuming the client's username is unique)
//       const client = await User.findOne({ username: clientUsername });
//       if (!client) {
//         return res.status(404).json({ message: "Client not found" });
//       }
  
//       // Assuming you want to add this slot to the client's schedule (e.g., updating the client model)
//       client.schedule.push({
//         counselor: counselor._id,
//         slot: slot._id,
//         time: slot.time,
//       });
  
//       await client.save();
  
//       res.status(200).json({ message: "Slot assigned successfully" });
  
//     } catch (error) {
//       res.status(500).json({ message: "Error assigning slot", error });
//     }
//   };

export const assignSlotToClient = async (req, res) => {
    try {
      const { counselorUsername, clientUsername, slotId } = req.body;
  
      if (!counselorUsername || !clientUsername || !slotId) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Find the counselor
      const counselor = await Counselor.findOne({ username: counselorUsername });
      if (!counselor) {
        return res.status(404).json({ message: "Counselor not found" });
      }
  
      // Find the schedule for the counselor
      const schedule = await Schedule.findOne({ counselor: counselor._id });
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
  
      // Find the slot by slotId
      const slot = schedule.slots.find((slot) => slot.slotId.toString() === slotId);
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
  
      // Check if the slot is already assigned
      if (slot.assignedTo) {
        return res.status(400).json({ message: "Slot already assigned" });
      }
  
      // Assign the slot to the client
      slot.assignedTo = clientUsername;
  
      // Save the updated schedule
      await schedule.save();
  
      // Find the client
      const client = await User.findOne({ username: clientUsername });
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      // Add the slot to the client's schedule
      if (!client.schedule) client.schedule = [];
      client.schedule.push({
        counselor: counselor._id,
        slot: slot.slotId,
        time: slot.time,
      });
  
      await client.save();
  
      res.status(200).json({ message: "Slot assigned successfully" });
    } catch (error) {
      console.error("Error assigning slot:", error);
      res.status(500).json({ message: "Error assigning slot", error });
    }
  };


  //Update

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