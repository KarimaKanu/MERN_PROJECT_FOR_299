import mongoose from 'mongoose';
const adminSchema = new mongoose.Schema(
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
      dob: {
        type: String,
        required: true,
        
      },
      contactNo: {
        type: String,
        required: true,
    
      },
      qualifications: {
        type: String,
        //enum: ['Male', 'Female', 'Other'], // restricts values to these options
        required: true, // if you want gender to be mandatory
      },
      emergencyNo:{
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
        
      },
      degree: {
        type: String,
        required: true,
        
      },
      role: {
        type: Number,
        required: true,
        default: 1,
        
      },
      
    
      
    },
    { timestamps: true }
  );
  
  const Admin = mongoose.model('Admin', adminSchema);
  
  export default Admin;