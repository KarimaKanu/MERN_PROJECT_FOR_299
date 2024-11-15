import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'


export default function ClientProfile() {
  const { currentUser} = useSelector(state => state.user)
   const selfCare = currentUser?.selfCare;
  return (
    
    <section>
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
          <Link className="link link-hover hover:text-teal-400">Curriculum</Link>
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
              <Link className="link link-hover hover:text-teal-400">Appointments</Link>
            </div>
          </div>
          
        </div>

        {/* Counselors Dropdown */}
        <div className="dropdown dropdown-hover border-l-2 border-teal-400 py-4">
          <div tabIndex="0">
            <div>
              <img src="./src/img/laptop-medical.svg" className="w-5 text-center m-auto" alt="Counselors" />
              <Link className="link link-hover hover:text-teal-400">Counselors</Link>
            </div>
          </div>
          
        </div>
      </div>

      {/* Welcome Message */}
      <h1 className="text-3xl font-bold p-5 text-center m-auto mt-10 rounded-lg bg-yellow-50 w-1/2 border-2 border-teal-300">
        Welcome <span>{currentUser.name}</span>
      </h1>
        
      <div className=' text-center  '>
      <button className='bg-teal-200 p-2 rounded-lg m-3 hover:bg-yellow-100 hover:text-teal-500  '>Sign Out</button>
      </div>
      
    </section>
    
  )
}
