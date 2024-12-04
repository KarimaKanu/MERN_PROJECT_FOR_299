

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext'
import Counselor from '../../../api/models/counselor.model';
import { toast } from 'react-toastify'


export default function Appointments() {
    // const currentUser = useSelector((state) => state.user.currentUser);
    // const token = useSelector((state) => state.user.currentUser?.token);
  
  const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token,  getDoctorsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()
    const fetchDocInfo = async () => {
      const docInfo = doctors.find((doc) => doc._id === docId)
      setDocInfo(docInfo);
      console.log(docInfo)
  }



const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
        // Create a new Date object for each iteration (don't modify today directly)
        let currentDate = new Date(today) // Create a copy of today
        currentDate.setDate(today.getDate() + i) // Add i days to the current date

        // Debug log to check the date
        //console.log("currentDate:", currentDate.toDateString()); // Log to see if it matches today + i days

        let endTime = new Date()
        endTime.setDate(today.getDate() + i)
        endTime.setHours(21, 0, 0, 0)

        // Adjust currentDate's time to the correct start time for today or any other day
        if (today.getDate() === currentDate.getDate()) {
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        } else {
            currentDate.setHours(10)
            currentDate.setMinutes(0)
        }

        let timeSlots = []

        // Generate time slots for the day
        while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            let day = currentDate.getDate()
            let month = currentDate.getMonth() + 1
            let year = currentDate.getFullYear()

            const slotDate = day + "_" + month + "_" + year
            const slotTime = formattedTime

            // Ensure slots_booked and slotDate are initialized
            docInfo.slots_booked = docInfo.slots_booked || {};
            docInfo.slots_booked[slotDate] = docInfo.slots_booked[slotDate] || [];

            // Check if the slot is available
            const isSlotAvailable = !docInfo.slots_booked[slotDate].includes(slotTime)

            if (isSlotAvailable) {
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })
            }

            currentDate.setMinutes(currentDate.getMinutes() + 30)
        }

        setDocSlots(prev => ([...prev, timeSlots]))
    }
}


// const bookAppointment = async () => {
//     //console.log('Token:', token);
//     console.log('available:', docInfo.available)

//   if (!token) {
//       toast.warning('Login to book appointment')
//       return navigate('/sign-in')
//   }

//   const date = docSlots[slotIndex][0].datetime
//   //console.log(date)

//   let day = date.getDate()
//   let month = date.getMonth() + 1
//   let year = date.getFullYear()

//   const slotDate = day + "_" + month + "_" + year

//   try {


//     const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { 
//         headers: { Authorization: `Bearer ${token}` }  // Using Authorization header
//       });
     
      
//       if (!data.success) {
//         console.error('Error booking appointment:', data.message);
//         toast.error(data.message);
//         return;
//     }

//       if (data.success) {
//           toast.success(data.message)
//           getDoctorsData();
//           navigate('/my-appointments')
//       } else {
//         console.log('Booking appointment with counselorId:', docId);

//           toast.error(data.message)
//       }

//   } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//   }

// }



const bookAppointment = async () => {
    // Ensure docInfo and its properties exist
    if (!docInfo) {
      toast.error("Counselor information is not loaded. Please try again.");
      console.error("docInfo is null or undefined.");
      return;
    }
  
    if (docInfo.available === undefined || docInfo.available === null) {
      toast.error("Availability information is missing. Please try again.");
      console.error("docInfo.available is undefined or null.");
      return;
    }
  
    console.log("Available status:", docInfo.available); // Debugging
  
    if (!token) {
      toast.warning("Login to book an appointment.");
      return navigate("/sign-in");
    }
  
    const date = docSlots[slotIndex][0]?.datetime;
    if (!date) {
      toast.error("Invalid slot selected.");
      return;
    }
  
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    const slotDate = `${day}_${month}_${year}`;
  
    try {
        console.log("Available status:", docInfo.available); // Debugging
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Available status:", docInfo.available); // Debugging
  
      if (!data.success) {
        console.log(data)
        console.error("Error booking appointment:", data.message);
        toast.error(data.message);
        return;
      }
  
      toast.success(data.message);
      getDoctorsData();
      navigate("/my-appointments");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.message);
    }
  };



useEffect(() => {
    if (doctors.length > 0) {
        fetchDocInfo()
    }
}, [doctors, docId])

useEffect(() => {
    if (docInfo) {
        getAvailableSlots()
    }
}, [docInfo])




  return docInfo ?  (
   <div className='bg-slate-200'>
     <div> 

{/* ---------- Counselor Details ----------- */}
<div className='flex flex-col sm:flex-row gap-4 bg-gray-500'>
    <div>
        {/* <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" /> */}
    </div>

    <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

        {/* ----- Counselor Info : name, degree, experience ----- */}

        <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} </p>
        <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>Specialization: {docInfo.specialization}</p>
            <br />
            <p className='py-0.5 px-2 border text-xs rounded-full'> Experience: {docInfo.experience}</p>
        </div>

        {/* ----- Doc About ----- */}
        <div>
            <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>Emergency No: {docInfo.emergencyNo} </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>Email: {docInfo.email}</p>
        </div>

        <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.feesPerConsultation}</span> </p>
    </div>
</div>

{/* Booking slots */}
<div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
    <p >Booking slots</p>
    <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
        ))}
       
    </div>

    <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
        ))}
    </div>

    {/* <button onClick={bookAppointment} className='bg-black text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button> */}
    <button
  onClick={bookAppointment}
  disabled={!docInfo || !docInfo.available || docSlots.length === 0}
  className={`${
    !docInfo || !docInfo.available || docSlots.length === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-black"
  } text-white text-sm font-light px-20 py-3 rounded-full my-6`}
>
  Book an appointment
</button>

</div>

{/* Listing Releated Doctors */}
{/* <RelatedDoctors speciality={docInfo.speciality} docId={docId} /> */}
</div>
   </div>


  ): null
}