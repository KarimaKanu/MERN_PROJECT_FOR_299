import {Link} from 'react-router-dom'
//import React from 'react'
export default function Header() {
  return (
    <div className='bg-teal-300'>
        <div className='flex justify-between items-center mx-20 p-6'>
            <h1 className='font-bold text-3xl'><Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
                  Serenity
                </Link></h1>
            <ul className='flex justify-between items-center'>
            <li>
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
                  About
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
                  Sign In
                </Link>
              </li>
            </ul>
        </div>
        </div>
    
    
  )
}
