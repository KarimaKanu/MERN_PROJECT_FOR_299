import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
   
  } from '../redux/user/userSlice';


export default function ClientPassChange() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(updateUserStart());
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(updateUserFailure(data));
            return;
          }
          dispatch(updateUserSuccess(data));
          setUpdateSuccess(true);
        } catch (error) {
          dispatch(updateUserFailure(error));
        }
      };
    
  return (
  
       <section>
         <form onSubmit={handleSubmit} action="" className="w-1/2 justify-center m-auto bg-yellow-50 mt-10 p-4 border-2 rounded-md">


{/* <h3 className="text-xl font-bold mb-3">Please Sign In</h3> */}

<input
  id="username"
  
  className="block mb-3 p-2 rounded w-full "
  placeholder="Change You Username"
  type="text"
   
  onChange={handleChange}
 
/>
<input
  id="password"
 
  className="block mb-3 p-2 b-2 rounded w-full"
  placeholder="Change Your Password"
  type="password"
  
  onChange={handleChange}
 
/>


<button

 className="rounded mt-3 bg-white px-8 py-2 hover:bg-teal-500 hover:opacity-95 disabled:opacity-80 hover:text-white">{loading ? 'Loading...' : 'Update'}</button>
<p className='text-green-700 mt-5'>
{updateSuccess && 'Updated successfully!'}</p> 

</form>
       </section>

  )
}
