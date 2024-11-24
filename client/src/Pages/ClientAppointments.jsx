import React from 'react'

export default function ClientAppointments() {
    const handleAssignClient = async (day, time) => {
        const clientUsername = prompt('Enter the client username:');
      
        if (!clientUsername) return;
      
        try {
          // Send request to assign the slot to the client
          const response = await axios.post(
            '/api/counselor/assign-slot',
            { counselorId: currentUser._id, day, time, clientUsername },
            { withCredentials: true }
          );
          alert(response.data.message);
          fetchAppointments(); // Refresh the appointments after assignment
        } catch (error) {
          alert(error.response.data.message);
        }
      };
  return (
    <div>ClientAppointments</div>
  )
}
