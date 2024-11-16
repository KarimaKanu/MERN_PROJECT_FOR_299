// import React from 'react'

// export default function PrivateRouteAdmin() {
//   return (
//     <div>PrivateRouteAdmin</div>
//   )
// }
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"



export default function PrivateRouteAdmin() {
    const { currentUser} = useSelector(state => state.user)
  return (
   currentUser ? <Outlet/> : <Navigate to='/admin-signin'/>
  )
}