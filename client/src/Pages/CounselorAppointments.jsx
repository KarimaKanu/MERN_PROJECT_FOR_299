

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


export default function CounselorAppointments() {
  
  const params = useParams();

  const { currentUser } = useSelector((state) => state.user);
  const [counselors, setCounselor] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const getUserData = async () => {
    try {
      
      const response = await fetch("http://localhost:3000/api/counselor/getCounselorById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ counselorId: params.counselorId }),
      });
      
      const data = await response.json(); // Parse JSON response
      
      if (data.success) { // Correctly access the success field
        setCounselor(data.data);
        console.log(data.data);
      }
      //console.log(localStorage.getItem("token"));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  

  

  return (
    <div>Page
      <div>{counselors && (<h1>{counselors.name}</h1>
      )
      }</div>
    </div>


  )}