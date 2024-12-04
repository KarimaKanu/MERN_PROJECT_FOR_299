

import React from "react";
import { useNavigate } from "react-router-dom";


const CounselorLists = ({ counselor }) => {
    

  
  const navigate = useNavigate();
  
  return (
    <>
    
      <div
        className="card m-2 border-2 p-4 rounded-3xl w-64  border-teal-400 shadow-lg"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/appointments/${counselor._id}`)}
      >
       
        <div className="card-header p-2 font-extrabold text-center text-2xl mb-2 bg-slate-300 rounded-lg text-teal-500 ">
           {counselor?.name || "No Name Provided"} 
        </div>
        <div className="card-body">
          <p className="border-b-2 p-1">
            <b>Specialization</b> {counselor?.specialization || "N/A"}
          </p>
          <p className="border-b-2 p-1">
            <b>Experience</b> {counselor?.experience  || "N/A"}
          </p>
          <div className="border-b-2 p-1">

          <input onChange={()=>changeAvailability(counselor._id)}   type="checkbox" checked={counselor.available} />
          <label htmlFor="">   Availability</label>
          </div>
          <p className="border-b-2 p-1">
            <b>Fees Per Consultation</b> {counselor?.feesPerConsultation  || "N/A"}
          </p>
          <p className="border-b-2 p-1">
            <b>Timings</b> {counselor?.timings?.[0] || "N/A"} -{" "}
            {counselor?.timings?.[1] || "N/A"}
          </p>
        </div>
      </div>
    </>
  );
};

export default CounselorLists;