import mongoose from 'mongoose';
const counselorSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
      name: {
        type: String,
        required: true,
    
      },
      age: {
        type: Number,
        required: true,
        
      },
      gender: {
        type: String,
        //enum: ['Male', 'Female', 'Other'], // restricts values to these options
        required: true, // if you want gender to be mandatory
      },
      
      maritalStatus: {
        type: String, // Make sure to define type as String
        //enum: ['Married', 'Unmarried'],
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
        
      },
      emergencyNo:{
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
        
      },
      role: {
        type: Number,
        required: true,
        default: 2,
        
      },
      
      
      
    },
    { timestamps: true }
  );
  
  const Counselor = mongoose.model('Counselor', counselorSchema);
  
  export default Counselor;