import React from 'react'
import { useSelector } from 'react-redux'

export default function ProfileCl() {
    const { currentUser} = useSelector(state => state.user)
  return (
    <div>
    <h1 className='m-auto my-4 text-center bg-slate-400 w-1/2 rounded-sm p-4'>User Profile</h1>
    <div >
     
      <div className='m-auto bg-slate-200 p-5 rounded-lg w-1/3'>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Name:</strong> {currentUser.name}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Username:</strong> {currentUser.username}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Email:</strong> {currentUser.email}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Age:</strong> {currentUser.age}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Gender:</strong> {currentUser.gender}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Occupation:</strong> {currentUser.occupation}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Marital Status:</strong> {currentUser.maritalStatus}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Contact No:</strong> {currentUser.contactNo}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Emergency No:</strong> {currentUser.emergencyNo}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Address:</strong> {currentUser.address}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Education Medium:</strong> {currentUser.educationMedium}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Upbringing Place:</strong> {currentUser.upbringingPlace}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Extra-curriculars:</strong> {currentUser.extracurriculars}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Current Concerns:</strong> {currentUser.currentConcerns}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Received Mental Health Services:</strong> {currentUser.receivedMentalHealthServices ? "Yes" : "No"}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Taking Psychiatric Medication:</strong> {currentUser.takingPsychiatricMedication ? "Yes" : "No"}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Self-Care:</strong> {currentUser.selfCare ? "Yes" : "No"}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Relationship:</strong> {currentUser.relationship ? "Yes" : "No"}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Social Activity:</strong> {currentUser.socialActivity ? "Yes" : "No"}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Professional:</strong> {currentUser.professional ? "Yes" : "No"}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Group Activity:</strong> {currentUser.groupActivity ? "Yes" : "No"}</p>
        <p className='p-2 border-2 border-stone-950 rounded-lg mb-2'><strong>Role:</strong> {currentUser.role}</p>
      </div>
    </div>
  </div>

  )
}
