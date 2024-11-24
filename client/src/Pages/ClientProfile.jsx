import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {signOut,deleteUserFailure,deleteUserStart,deleteUserSuccess} from '../redux/user/userSlice.js';



export default function ClientProfile() {
  const { currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      
      dispatch(signOut());
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/deleteUser/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
   
  return (
    
    <section>
     

      {/* Welcome Message */}
      <h1 className="text-3xl font-bold p-5 text-center m-auto mt-10 rounded-lg bg-yellow-50 w-1/2 border-2 border-teal-300">
        Welcome <span>{currentUser.name}</span>
      </h1>
        
      <div className=' text-center  '>
      <button onClick={handleSignOut} className='bg-teal-200 p-2 rounded-lg m-3 hover:bg-yellow-100 hover:text-teal-500  '>Sign Out</button>
      <button onClick={handleDeleteAccount} className='bg-teal-200 p-2 rounded-lg m-3 hover:bg-yellow-100 hover:text-teal-500  '>delete</button>
      </div>

      
    </section>
    
  )
}
