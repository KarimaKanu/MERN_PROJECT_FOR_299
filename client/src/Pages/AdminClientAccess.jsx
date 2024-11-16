// import React from 'react'
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux'


// export default function AdminClientAccess() {
//     const { currentUser} = useSelector(state => state.user)
//   return (
//     <div>AdminClientAccess</div>
//   )
// }
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function AdminClientAccess() {
    // const fetchClients = async () => {
    //     try {
    //       const response = await axios.get('/api/admin/clients');
    //       console.log(response.data); // Check what data is being received
    //     } catch (error) {
    //       console.error('Error fetching clients:', error);
    //     }
    //   };
  const { currentUser } = useSelector((state) => state.user);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch clients from the backend
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/admin/clients'); // Adjust endpoint as needed
       ; 
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <h1 className="text-2xl font-bold text-center mt-10 text-yellow-500">
        Loading clients...
      </h1>
    );
  }

  return (
    <section className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">All Clients</h1>
      <table className="table-auto w-full border-collapse border border-teal-300">
        <thead>
          <tr>
            <th className="border border-teal-300 p-2">Name</th>
            <th className="border border-teal-300 p-2">Email</th>
            <th className="border border-teal-300 p-2">Age</th>
            <th className="border border-teal-300 p-2">Gender</th>
            <th className="border border-teal-300 p-2">Occupation</th>
            <th className="border border-teal-300 p-2">Contact No</th>
            <th className="border border-teal-300 p-2">Current Concerns</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td className="border border-teal-300 p-2">{client.name}</td>
              <td className="border border-teal-300 p-2">{client.email}</td>
              <td className="border border-teal-300 p-2">{client.age}</td>
              <td className="border border-teal-300 p-2">{client.gender}</td>
              <td className="border border-teal-300 p-2">{client.occupation}</td>
              <td className="border border-teal-300 p-2">{client.contactNo}</td>
              <td className="border border-teal-300 p-2">{client.currentConcerns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}