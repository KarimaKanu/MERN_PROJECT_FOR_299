import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
//import React from 'react'

export default function SignUp() {
  const[formData, setFormData] = useState({
   username: "",
  email: "",
  password: "",
  name: '',
  age: 0,
  gender: "",
  occupation: "",
  maritalStatus: "",
  contactNo: "",
  emergencyNo: "",
  address: "",
  educationMedium: "",
  upbringingPlace: "",
  extracurriculars: "",
  currentConcerns: "",
  receivedMentalHealthServices: false,
  takingPsychiatricMedication: false,
  selfCare: false,
  relationship: false,
  socialActivity: false,
  professional: false,
  groupActivity: false

  })
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value, // Handle checkboxes properly
    });
  };
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try {
      setLoading(true)
      setError(false);
      const res = await fetch('/api/auth/signup',{ 
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
      navigate('/client-profile')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  
  return (
    <div className="text-center m-auto">
      <h1 className="text-3xl font-bold p-5 flex justify-center text-center mt-10 m-auto rounded-lg bg-yellow-100 w-1/2">
        Client SignUp Page
      </h1>

      <form onSubmit={handleSubmit}  className="w-full flex justify-center">
        <section className="w-1/2 bg-teal-100 p-10 rounded my-10">
          <div>
            <h3 className="text-xl font-bold mb-3">Please SignUp</h3>
            <input
              id="username"
              
              className="block mb-3 p-2 rounded w-full"
              placeholder="Enter Your UserName"
              type="text"
              required 
              onChange={handleChange}
              />
            <input

              className="block mb-3 p-2 rounded w-full"
              placeholder="Enter Your Email"
              type="email"
              id='email'
              required 
              onChange={handleChange}
            />
            <input
              id="password"
             
              className="block mb-3 p-2 rounded w-full"
              placeholder="Enter Your Password"
              type="password"
              required
              onChange={handleChange}
            />
            <p className="  mb-3">
              Have an account? 
            </p>
              <Link to='/sign-in'>
              <span className='text-blue-400 '>Sign In</span>
              </Link> 
          </div>
        <p className='text-red-600 mt-3'>{error &&'Something went wrong'}</p>
        
        

        </section>

      </form>
      <form onSubmit={handleSubmit} className="flex justify-center text-start">
      <section className="w-9/12 bg-teal-100 p-10 rounded mt-10">
        <div>
          <h3 className="text-xl font-bold mb-3">
            Please Give us The Following Information to Register
          </h3>
          <h5 className="mb-3">
            Information you provide here will be kept confidential
          </h5>

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Name"
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
          
          

          <label htmlFor="occupation">Occupation:</label>
          <input
            id="occupation"
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Profession"
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          /> <br />

          
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

          
        </div>
        
      </section>
    </form>


    <form onSubmit={handleSubmit}>
      <section className="w-9/12 bg-teal-100 p-10 rounded m-auto mt-10 text-start">
        <div>
          <h3 className="text-xl font-bold">
            Please Give Us the Following Information to Register
          </h3>
          <h5 className="mb-3">
            Information you provide here will be kept confidential
          </h5>
          <label>Medium of Education:</label>
          <input
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Bangla/English/Other Languages"
            id='educationMedium'
            type="text"
            name="educationMedium"
            value={formData.educationMedium}
            onChange={handleChange}
          />

          <label>The Place You Were Brought up:</label>
          <input
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Urban/Sub-urban/Rural/Abroad"
            type="text"
            id='upbringingPlace'
            name="upbringingPlace"
            value={formData.upbringingPlace}
            onChange={handleChange}
          />

          <label>Extracurricular Activities:</label>
          <input
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Answer"
            type="text"
            id='extracurriculars'
            name="extracurriculars"
            value={formData.extracurriculars}
            onChange={handleChange}
          />

          <label>Present Concerns / Major Issues You Are Facing:</label><br />
          <textarea
            className="rounded-md mb-3 p-2 w-9/12"
            name="currentConcerns"
            id='currentConcerns'
            rows="4"
            placeholder="Describe Your Concerns"
            value={formData.currentConcerns}
            onChange={handleChange}
          ></textarea>
          <br />

          

          
        <h1>Present Concerns:</h1>

          <input
            type="checkbox"
            name="selfCare"
            id='selfCare'
            checked={formData.selfCare}
            onChange={handleChange}
          />
          <label htmlFor="selfCare">
            Self Care
          </label><br />

          <input
            type="checkbox"
            name="relationship"
            id='relationship'
            checked={formData.relationship}
            onChange={handleChange}
          />
          <label htmlFor="relationship">
            Relationship Issues.
          </label><br />


          <input
            type="checkbox"
            name="socialActivity"
            id='socialActivity'
            checked={formData.socialActivity}
            onChange={handleChange}
          />
          <label htmlFor="socialActivity">
            Performing Social Activities.
          </label><br />

          <input
            type="checkbox"
            name="professional"
            id='professional'
            checked={formData.professional}
            onChange={handleChange}
          />
          <label htmlFor="professional">
            Professional Concerns.
          </label><br />


          <input
            type="checkbox"
            name="groupActivity"
            id='groupActivity'
            checked={formData.groupActivity}
            onChange={handleChange}
          />
          <label htmlFor="groupActivity">
            Issues in performing Group Activities.
          </label><br />
          <input
            type="checkbox"
            name="receivedMentalHealthServices"
            id='receivedMentalHealthServices'
            checked={formData.receivedMentalHealthServices}
            onChange={handleChange}
          />
          <label htmlFor="receivedMentalHealthServices">
            Have you ever received any type of Mental Health Services?
          </label><br />
          <input
            type="checkbox"
            id='takingPsychiatricMedication'
            name="takingPsychiatricMedication"
            checked={formData.takingPsychiatricMedication}
            onChange={handleChange}
          />
         <label htmlFor="takingPsychiatricMedication">
            Are you currently taking any psychiatric medication?
          </label><br />
        



          
          

          
        </div>
        <button
            disabled={loading}
             className="rounded mt-3 bg-white px-8 py-2 hover:bg-teal-500 hover:opacity-95 disabled:opacity-80 hover:text-white">{loading ? 'Loading...' : 'Sign Up'}</button>
      </section>
      
    </form>
    <button
            disabled={loading}
             className="rounded mt-3 bg-white px-8 py-2 hover:bg-teal-500 hover:opacity-95 disabled:opacity-80 hover:text-white">{loading ? 'Loading...' : 'Sign Up'}</button>
    
    
    </div>
  )
}
