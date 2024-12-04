import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (
        <div className=' flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
            <h1 className='text-3xl text-center font-medium'>Top Doctors to Book</h1>
            {/* <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p> */}
            <div className='mx-auto my-6 p-4 max-w-screen-lg grid grid-cols-3 gap-7'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        {/* <img className='bg-[#EAEFFF]' src={item.image} alt="" /> */}
                        <div className="card-header p-2 font-extrabold text-center text-2xl mb-2 bg-slate-300 rounded-lg text-teal-500 ">
           {item?.name || "No Name Provided"} 
        </div>
                        <div className='p-4'>
                        <p className="border-b-2 p-1">
            <b>Specialization</b> {item?.specialization || "N/A"}
          </p>
          <p className="border-b-2 p-1">
            <b>Experience</b> {item?.experience  || "N/A"}
          </p>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            {/* <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm'>{item.specialization}</p> */}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
        </div>

    )
}

export default TopDoctors