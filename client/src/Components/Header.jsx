// import {Link} from 'react-router-dom'
// import { useSelector } from 'react-redux'
// export default function Header() {
//     const { currentUser} = useSelector(state => state.user)
//   return (
//     <div className='bg-teal-300 sticky top-0 z-50'>
//         <div className='flex justify-between items-center mx-20 p-2'>
//             <h1 className='font-bold text-3xl'><Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
//                   Serenity
//                 </Link></h1>
//             <ul className='flex justify-between items-center'>
//             <li>
//                 <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
//                   About
//                 </Link>
//               </li>
//               <li>
//               <Link 
//   to={
//     currentUser
//       ? currentUser.role === 1
//         ? "/admin-profile"
//         : currentUser.role === 2
//         ? "/counselor-profile"
//         : currentUser.role === 3
//         ? "/client-profile"
//         : "/" // Default if the role is none of the above
//       : "/sign-in" // If no currentUser, redirect to sign-in
//   } 
  
//   className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
// >
//   {currentUser ? 
//     <p className='font-extrabold text-lime-950 bg-amber-100 p-2 rounded-full'>
//       {currentUser.username}
//     </p> 
//     : <p>Sign In</p>
//   }
// </Link>
//               </li>
//             </ul>
//         </div>
//         </div>
    
    
//   )
// }

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation(); // Get the current route

  // Determine the link based on the user's role
  const userProfileLink = currentUser
    ? currentUser.role === 1
      ? "/admin-profile"
      : currentUser.role === 2
      ? "/counselor-profile"
      : currentUser.role === 3
      ? "/client-profile"
      : "/"
    : "/sign-in";

  return (
    <div className="bg-teal-300 sticky top-0 z-50">
      <div className="flex justify-between items-center mx-20 p-2">
        <h1 className="font-bold text-3xl">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100">
            Serenity
          </Link>
        </h1>
        <ul className="flex justify-between items-center">
          <li>
            <Link
              to="/"
              className={`block px-4 py-2 text-gray-700 hover:bg-teal-100 ${
                location.pathname === "/" ? "bg-teal-500 text-white rounded" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`block px-4 py-2 text-gray-700 hover:bg-teal-100 ${
                location.pathname === "/about" ? "bg-teal-500 text-white rounded" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={userProfileLink}
              className={`block px-4 py-2 text-gray-700 hover:bg-teal-100 ${
                location.pathname === userProfileLink ? "bg-teal-500 text-white rounded" : ""
              }`}
            >
              {currentUser ? (
                <p className="font-extrabold text-lime-950 bg-amber-100 p-2 rounded-full">
                  {currentUser.username}
                </p>
              ) : (
                <p>Sign In</p>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}