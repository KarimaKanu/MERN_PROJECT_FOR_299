// import React from 'react'

// export default function CounselorRegistration() {
//   return (
//     <div>CounselorRegistration</div>
//   )
// }

import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'


export default function CounselorRegistration() {
  const[formData, setFormData] = useState({
username: "",
  email: "",
  password: "",
  name: "",
  age: 0,
  gender: "",
  maritalStatus: "",
  contactNo: "",
  emergencyNo: "",
  address: ""
  

  })
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log('Submitting:', formData);
  };
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try {
      setLoading(true)
      setError(false);
      const res = await fetch('/api/counselor/counselorSignup',{ 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formData),})
      
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if(data.success === false)
        {
        setError(true);
        return;

      }
      navigate('/counselor-profile')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  
  return (
    <div className=" m-auto">
      <h1 className="text-3xl font-bold p-5 flex justify-center text-center  mt-10 m-auto rounded-lg bg-yellow-100 w-1/2 ">
        Counselor Registration
      </h1>

      <form onSubmit={handleSubmit}  className="w-full   items-center m-auto justify-center">
        <section className="w-1/2 m-auto bg-teal-100 p-10 rounded my-10">
          <div>
            
            <input
              id="username"
              
              className="block mb-3 p-2 rounded w-full"
              placeholder="UserName"
              type="text"
              required 
              onChange={handleChange}
              />
            <input

              className="block mb-3 p-2 rounded w-full"
              placeholder="Email"
              type="email"
              id='email'
              required 
              onChange={handleChange}
            />
            <input
              id="password"
             
              className="block mb-3 p-2 rounded w-full"
              placeholder="Password"
              type="password"
              required
              onChange={handleChange}
            />
        
          
          <h3 className="text-xl font-bold mb-3">
            Information to Register
          </h3>
          

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="age">Age:</label>
          <input
            id="age"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

<label htmlFor="name">Gender:</label>
          <input
            id="gender"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Male/Female"
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
          
          <label htmlFor="name">Marital Status</label>
          <input
            id="maritalStatus"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Name"
            type="text"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          />
         <br />

          <label htmlFor="address">Present Address:</label>
          <input
            id="address"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Current Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <label htmlFor="contactNo">Contact No:</label>
          <input
            id="contactNo"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Phone Number"
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
          />

          <label htmlFor="emergencyNo">Emergency No (Family member / Close person):</label>
          <input
            id="emergencyNo"
            className="block mb-6 p-2 rounded w-9/12"
            placeholder="Enter Emergency Contact Number"
            type="tel"
            name="emergencyNo"
            value={formData.emergencyNo}
            onChange={handleChange}
          />
          <p className='text-red-600 mt-3'>{error &&'Something went wrong'}</p>

          
        </div>
        <button
            disabled={loading}
            className="rounded mt-3 bg-white px-8 py-2 hover:bg-teal-500 hover:opacity-95 disabled:opacity-80 hover:text-white items-center">{loading ? 'Loading...' : 'Register'}</button>
        
      </section>
      
    </form>


    
   
    
    
    </div>
  )
}
