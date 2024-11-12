import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
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
        enum: ['Male', 'Female', 'Other'], // restricts values to these options
        required: true, // if you want gender to be mandatory
      },
      occupation: {
        type: String,
        required: true,
        
      },
      maritalStatus: {
        type: String, // Make sure to define type as String
        enum: ['Married', 'Unmarried'],
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
    //   address: {
    //     type: String,
    //     required: true,
        
    //   },
    //   educationMedium: {
    //     type: String,
    //     required: true,
    //   },
    //   upbringingPlace: {
    //     type: String,
    //     required: true,
    //   },
    //   extracurriculars: {
    //     type: String,
    //     required: true,
    //   },
    //   currentConcerns: {
    //     type: String,
    //     required: true,
    //   },
      
    //   receivedMentalHealthServices: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   takingPsychiatricMedication: {
    //     type: Boolean,
    //     default: false,
    //   },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model('User', userSchema);
  
  export default User;