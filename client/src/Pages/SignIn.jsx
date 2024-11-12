import {Link, Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react'
//import React from 'react'

export default function SignIn() {
  const[formData, setFormData] = useState({})
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      const res = await fetch('/api/auth/signin',{ 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formData),})
      
      const data = await res.json();
      
      setLoading(false);
      if(data.success === false)
        {
        setError(true);
        return;

      }
      navigate('/client-profile');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  
  return (
    <div className="text-center m-auto">
      <h1 className="text-3xl font-bold p-5 flex justify-center text-center mt-10 m-auto rounded-lg bg-yellow-100 w-1/2">
        Client SignIN Page
      </h1>

      <form onSubmit={handleSubmit}  className="w-full flex justify-center">
        <section className="w-1/2 bg-teal-100 p-10 rounded my-10">
          <div>
            <h3 className="text-xl font-bold mb-3">Please Sign In</h3>
            
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
            
            
            <button
            disabled={loading}
             className="rounded mt-3 bg-white px-8 py-2 hover:bg-teal-500 hover:opacity-95 disabled:opacity-80 hover:text-white">{loading ? 'Loading...' : 'Sign IN'}</button>
             <p className="  my-3">
              Don't have an account? 
            </p>
              <Link to='/sign-up'>
              <span className='text-blue-400 '>Sign Up</span>
              </Link> <br />
          </div>
        <p className='text-red-600 mt-3'>{error &&'Something went wrong'}</p>

        </section>

      </form>
    </div>
  )
}
