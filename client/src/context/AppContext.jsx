import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    const backendUrl = "http://localhost:3000"

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '')
    const [userData, setUserData] = useState(false)

    // Getting Doctors using API
    const getDoctorsData = async () => {

        try {

            const response = await fetch(backendUrl + '/api/counselor/list', {
                method: 'GET', // Explicitly setting the method to GET
              });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
              }
          
              const data = await response.json(); // Parse the JSON data
          
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Profile using API
    // const loadUserProfileData = async () => {

    //     try {

    //         const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

    //         if (data.success) {
    //             setUserData(data.userData)
    //         } else {
    //             toast.error(data.message)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.message)
    //     }

    // }

    useEffect(() => {
        getDoctorsData()
    }, [])

    // useEffect(() => {
    //     if (token) {
    //         loadUserProfileData()
    //     }
    // }, [token])

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider