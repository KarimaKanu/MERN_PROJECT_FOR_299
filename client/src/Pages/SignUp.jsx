import { useState } from 'react'
import {Link} from 'react-router-dom'
//import React from 'react'

export default function SignUp() {
  const[formData, setFormData] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
  {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
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
              id="email"
              
              className="block mb-3 p-2 rounded w-full"
              placeholder="Enter Your Email"
              type="email"
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
              </Link> <br />
            
            <button
            disabled={loading}
             className="rounded mt-3 bg-white px-8 py-2 hover:bg-teal-500 hover:opacity-95 disabled:opacity-80 hover:text-white">{loading ? 'Loading...' : 'Sign Up'}</button>
          </div>
        <p className='text-red-600 mt-3'>{error &&'Something went wrong'}</p>

        </section>

      </form>
    </div>
  )
}
