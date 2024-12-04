import React from 'react'
import { useSelector } from 'react-redux';

export default function ProfileCounselor() {
  const { currentUser} = useSelector(state => state.user)
  return (
    <div>
    <h1 className='m-auto my-4 text-center bg-slate-400 w-1/2 rounded-sm p-4'>Counselor Profile</h1>
    <div >
      
      <div className='m-auto bg-slate-200 p-5 rounded-lg w-1/3' >
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Name:</strong> {currentUser.name}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Username:</strong> {currentUser.username}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Email:</strong> {currentUser.email}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Age:</strong> {currentUser.age}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Gender:</strong> {currentUser.gender}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Specialization:</strong> {currentUser.specialization}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Marital Status:</strong> {currentUser.maritalStatus}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Experience:</strong> {currentUser.experience} years</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Fees Per Consultation:</strong> ${currentUser.feesPerConsultation}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Status:</strong> {currentUser.status}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Contact No:</strong> {currentUser.contactNo}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Emergency No:</strong> {currentUser.emergencyNo}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Address:</strong> {currentUser.address}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Available:</strong> {currentUser.available ? "Yes" : "No"}</p>
      </div>
    </div>
  </div>
);



};
  

