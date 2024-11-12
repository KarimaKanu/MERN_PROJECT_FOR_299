import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
    const { currentUser} = useSelector(state => state.user)
  return (
    <div className='bg-teal-300'>
        <div className='flex justify-between items-center mx-20 p-2'>
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
                <Link to="/client-Profile" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
                {currentUser ? <p className='font-extrabold text-lime-950 bg-amber-100 p-2 rounded-full'>{currentUser.username}</p>: <p>Sign In</p> }
                  
                </Link>
              </li>
            </ul>
        </div>
        </div>
    
    
  )
}
