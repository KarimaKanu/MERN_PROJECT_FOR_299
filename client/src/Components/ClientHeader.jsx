import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

export default function ClientHeader() {
  const location = useLocation(); // Get the current route
  const { currentUser} = useSelector(state => state.user)
  return (
    <div>

    <div className="grid grid-flow-col sticky top-16 z-50 bg-yellow-50 text-base-content text-center">
    {/* Home Link */}
    <div className="border-l-2 border-teal-400 p-2">
      <img src="./src/img/home.svg" className="w-5 text-center m-auto" alt="Home" />
      <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
              Home
            </Link>
    </div>

    {/* Profile Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-3">
      <div tabIndex="0" role="button">
        <div>
          <img src="./src/img/user.svg" className="w-5 text-center m-auto" alt="Profile" />
          <Link to="profile-cl"  className={`link link-hover hover:text-teal-400 ${
  location.pathname === "/home" ? "bg-teal-200 border-y-4 text-white " : ""
}`}>Profile</Link>
        </div>
      </div>
      
    </div>

    {/* My Account Dropdown */}
    <div className={`dropdown dropdown-hover border-l-2 border-teal-400 py-3 ${
  location.pathname === "/client-pass-change" ? "bg-teal-300  text-black " : ""
}`}>
      <div tabIndex="0" role="button">
        <div >
          <img src="./src/img/user-pen.svg" className="w-5 text-center m-auto" alt="My Account" />
          <Link to="client-pass-change" className={`link link-hover hover:text-teal-400 `}>My Account</Link>
        </div>
      </div>
      
    </div>

    {/* Payments Dropdown */}
    <div className={`dropdown dropdown-hover border-l-2 border-teal-400 py-3 ${
  location.pathname === "/" ? "bg-teal-300  text-black " : ""
}`}>
      <div tabIndex="0" role="button">
        <div>
          <img src="./src/img/hand-bill.svg" className="w-5 text-center m-auto" alt="Payments" />
          <Link className="link link-hover hover:text-teal-400">Payments</Link>
        </div>
      </div>

    </div>

    {/* Curriculum Link */}
    <div className="border-l-2 border-teal-400 p-3">
      <img src="./src/img/rules-alt.svg" className="w-5 text-center m-auto" alt="Curriculum" />
      <Link className="link link-hover hover:text-teal-400">Curriculum</Link>
    </div>

    {/* Services Link */}
    <div className="border-l-2 border-teal-400 p-4">
      <img src="./src/img/shipping-timed.svg" className="w-5 text-center m-auto" alt="Services" />
      <Link className="link link-hover hover:text-teal-400">Services</Link>
    </div>

    {/* Appointments Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-3">
      <div tabIndex="0" role="button">
        <div>
          <img src="./src/img/calendar-days.svg" className="w-5 text-center m-auto" alt="Appointments" />
          <Link className="link link-hover hover:text-teal-400">My Appointments</Link>
        </div>
      </div>
      
    </div>

    {/* Counselors Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-3">
      <div tabIndex="0">
        <div>
          <img src="./src/img/laptop-medical.svg" className="w-5 text-center m-auto" alt="Counselors" />
          <Link to="/show-counselors" className="link link-hover hover:text-teal-400">Book Appointment</Link>
        </div>
      </div>
      
    </div>
   
  </div>
  
  
    </div>
  )
}
