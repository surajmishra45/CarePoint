import { createContext } from 'react'
// import { doctors } from '../assets/assets_frontend/assets'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify';


export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const currencySymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [userData,setUserData]=useState(false)
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):null)

    const getDoctorData=async()=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                console.log(data)
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const loadUserProfileData = async () => {
        try {
            console.log("Token being sent:", token);
            
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("Full response data:", data.userData);
    
            if (data.success) {
                setUserData(data.userData || {}); // Avoid setting undefined
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };
   
    const value={
        doctors,getDoctorData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData,
    }
  
    useEffect(()=>{
        getDoctorData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider