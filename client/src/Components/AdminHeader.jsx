
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function AdminHeader() {
    const { currentUser} = useSelector(state => state.user)
  return (
    
    <div className="grid grid-flow-col bg-yellow-50 text-base-content rounded text-center">
    {/* Home Link */}
    <div className="border-l-2 border-teal-400 p-2">
      <img src="./src/img/home.svg" className="w-5 text-center m-auto" alt="Home" />
      <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
              Home
            </Link>
    </div>

    {/* Profile Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-4">
      <div tabIndex="0" role="button">
        <div>
          <img src="./src/img/user.svg" className="w-5 text-center m-auto" alt="Profile" />
          <Link className="link link-hover hover:text-teal-400">Profile</Link>
        </div>
      </div>
      
    </div>

    {/* My Account Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-4">
      <div tabIndex="0" role="button">
        <div>
          <img src="./src/img/user-pen.svg" className="w-5 text-center m-auto" alt="My Account" />
          <Link className="link link-hover hover:text-teal-400">My Account</Link>
        </div>
      </div>
      
    </div>

    {/* Payments Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-4">
      <div tabIndex="0" role="button">
        <div>
          <img src="./src/img/hand-bill.svg" className="w-5 text-center m-auto" alt="Payments" />
          <Link className="link link-hover hover:text-teal-400">Payments</Link>
        </div>
      </div>

    </div>

    {/* Curriculum Link */}
    <div className="border-l-2 border-teal-400 p-4">
      <img src="./src/img/rules-alt.svg" className="w-5 text-center m-auto" alt="Curriculum" />
      <Link to="/counselor-registration" className="link link-hover hover:text-teal-400">Counselor Registration</Link>
    </div>

    {/* Services Link */}
    <div className="border-l-2 border-teal-400 p-4">
      <img src="./src/img/shipping-timed.svg" className="w-5 text-center m-auto" alt="Services" />
      <Link className="link link-hover hover:text-teal-400">Services</Link>
    </div>

    {/* Appointments Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-4">
      <div tabIndex="0" role="button">
        <div>
          <img src="./src/img/calendar-days.svg" className="w-5 text-center m-auto" alt="Appointments" />
          <Link to="/admin-counselor-access"  className="link link-hover hover:text-teal-400">Counselors</Link>
        </div>
      </div>
      
    </div>

    {/* Counselors Dropdown */}
    <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-4">
      <div tabIndex="0">
        <div>
          <img src="./src/img/laptop-medical.svg" className="w-5 text-center m-auto" alt="Counselors" />
          <Link to="/admin-client-access"  className="link link-hover hover:text-teal-400">Clients</Link>
        </div>
      </div>
      
    </div>
    
  </div>


    
  )
}
