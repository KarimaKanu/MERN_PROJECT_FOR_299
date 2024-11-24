import mongoose from "mongoose";


// const slotSchema = new mongoose.Schema({
//     time: String,
//     isReservedForClient: Boolean,
//     assignedTo: { type: String, default: null }, // Client username
//   });
  
// const scheduleSchema = new mongoose.Schema(
//   {
//     counselor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Counselor", // Reference to Counselor model
//       slots: [slotSchema],
//     },
//     day: {
//       type: String,
//       enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], // 5 working days
//       required: true,
//     },
//     slots: [
//       {
//         time: {
//           type: String,
//           required: true, // Example: "9:00 AM - 10:00 AM"
//         },
//         isBooked: {
//           type: Boolean,
//           default: false,
//         },
//         bookedBy: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User", // Reference to User (client) model
//           default: null, // Null if the slot is free
//         },
//         isReservedForClient: {
//           type: Boolean,
//           default: false, // If true, only assigned clients can book this slot
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Schedule = mongoose.model("Schedule", scheduleSchema);

// export default Schedule;

const slotSchema = new mongoose.Schema(
    {
      slotId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,  // Automatically generates a unique ID for each slot
      },
      time: String,
      isReservedForClient: Boolean,
      assignedTo: { type: String, default: null }, // Client username
    },
    { _id: false } // Disable automatic _id for individual slot
  );


  const scheduleSchema = new mongoose.Schema(
    {
      counselor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Counselor", // Reference to Counselor model
      },
      day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], // 5 working days
        required: true,
      },
      slots: [
        {
          slotId: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId, // Unique identifier for each slot
          },
          time: {
            type: String,
            required: true, // Example: "9:00 AM - 10:00 AM"
          },
          isBooked: {
            type: Boolean,
            default: false,
          },
          bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to User (client) model
            default: null, // Null if the slot is free
          },
          isReservedForClient: {
            type: Boolean,
            default: false, // If true, only assigned clients can book this slot
          },
        },
      ],
    },
    { timestamps: true }
  );
  
  const Schedule = mongoose.model("Schedule", scheduleSchema);
  
  export default Schedule;