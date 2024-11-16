// import React from 'react'
// export default function AdminProfile() {
   
//   return (
//     <div>AdminProfile</div>
  
//   )
// }


import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'


export default function AdminProfile() {
  const { currentUser} = useSelector(state => state.user)
  

  
  if (!currentUser) {
    // Fallback UI while currentUser is being fetched
    return (
      <h1 className="text-2xl font-bold text-center mt-10 text-red-500">
        Loading profile...
      </h1>
    );
  }

   
  return (
    
    <section>
     

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
