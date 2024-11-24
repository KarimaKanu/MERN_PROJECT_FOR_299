

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// export default function CounselorAppointments() {
//   const { currentUser } = useSelector((state) => state.user); // Assuming Redux holds counselor details
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         // Assuming the API endpoint retrieves the schedule for the logged-in counselor
//         const response = await axios.get(
//           `/api/counselor/schedule/${currentUser._id}`,
//           { withCredentials: true } // Include credentials for cookie-based auth
//         );
//         //console.log(currentUser.name)
//         setAppointments(response.data); // Save appointments in state
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load appointments. Please try again.');
//         setLoading(false);
//       }
//     };

//     if (currentUser?._id) {
//         console.log(currentUser)
//       fetchAppointments();
//     }
//   }, [currentUser]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <div className="appointments">
//       <h1 className='font-extrabold text-3xl text-center m-3'>Weekly Schedule</h1>
//       {appointments.length === 0 ? (
//         <p>No appointments scheduled.</p>
//       ) : (
//         appointments.map((daySchedule) => (
//           <div  key={daySchedule.day} className="day-schedule">
//             <h2 className='font-bold text-center bg-slate-300 w1/2 p-2 m-auto rounded-lg' >{daySchedule.day}</h2>
//             <ul className=' w-1/2 m-auto  my-4'>
//               {daySchedule.slots.map((slot, index) => (
//                 <li key={index} className='bg-yellow-50 p-3 m-1 rounded-lg border-2  text-center'>
//                   {slot.time} -{' '}
//                   <span className='bg-teal-100 p-3 rounded-lg'>{slot.isReservedForClient ? 'Reserved for Clients' : 'Open for Booking'}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function CounselorAppointments() {
  const { currentUser } = useSelector((state) => state.user); // Assuming Redux holds counselor details
  const [appointments, setAppointments] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
            // Make the GET request using Fetch
            const response = await fetch(`api/counselor/schedule/${currentUser._id}`, {
              method: "GET", // Specify the HTTP method
              credentials: "include", // Include credentials for cookie-based auth
              headers: {
                "Content-Type": "application/json", // Optional, if expecting JSON response
              },
            });
          
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          
            // Parse JSON response
            const data = await response.json();
          
            // Update state with the fetched data
            setAppointments(data);
            setLoading(false);
      } catch (err) {
        setError('Failed to load appointments. Please try again.');
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchAppointments();
    }
  }, [currentUser]);

  const handleAssignClient = async (slotId) => {
    try {
      const response = await axios.post(
        '/api/counselor/assign-slot',
        {
          counselorUsername: currentUser.username,  // Pass the counselor's username
          clientUsername: client.username,  // Pass the client's username
          slotId: slotId,  // Pass the slot's ID
        },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error assigning slot', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="appointments">
      <h1 className="font-extrabold text-3xl text-center m-3">Weekly Schedule</h1>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        appointments.map((daySchedule) => (
          <div key={daySchedule.day} className="day-schedule">
            <h2 className="font-bold text-center bg-slate-300 w1/2 p-2 m-auto rounded-lg">
              {daySchedule.day}
            </h2>
            <ul className="w-1/2 m-auto my-4">
              {daySchedule.slots.map((slot, index) => (
                <li key={index} className="bg-yellow-50 p-3 m-1 rounded-lg border-2 text-center">
                  {slot.time} -{' '}
                  <span className="bg-teal-100 p-3 rounded-lg">
                    {slot.isReservedForClient
                      ? slot.assignedTo
                        ? `Assigned to ${slot.assignedTo}`
                        : 'Reserved'
                      : 'Open'}
                  </span>
                  {slot.isReservedForClient === false && !slot.assignedTo && (
                    <button
                      onClick={() => handleAssignClient(daySchedule.day, slot.time)}
                      className="bg-blue-500 text-white p-2 ml-2 rounded"
                    >
                      Assign
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}