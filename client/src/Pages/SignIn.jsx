import {Link, Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { signInStart, signInSuccess, signInFailure  } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';


export default function SignIn() {
  const[formData, setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user);
  const { currentUser} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>
  {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{ 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(formData),})
      
      const data = await res.json();
      
      if(data.success === false)
        {
          dispatch(signInFailure(data.message));
          return;
          
        }
        dispatch(signInSuccess(data));
        if(data.role==3)
        {
          navigate('/client-profile');

        }
        if(data.role==1)
        {
          navigate('/admin-profile');

        }
        if(data.role==2)
        {
          navigate('/counselor-profile');

        }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  }
  
  return (
    <div className="text-center m-auto">
      <h1 className="text-3xl font-bold p-5 flex justify-center text-center mt-10 m-auto rounded-lg bg-yellow-100 w-1/2">
        SignIN Page
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
        {/* <p className='text-red-600 mt-3'>{error ? error|| 'Something went wrong' : ""}</p> */}
        <p className="text-red-600 mt-3">
  {error ? (typeof error === 'object' ? error.message : error) : ""}
</p>
        </section>

      </form>
    </div>
  )
}
