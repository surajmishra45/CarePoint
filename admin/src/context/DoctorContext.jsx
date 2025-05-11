import { useState } from "react";
import { createContext } from "react";
import  axios  from 'axios';
import { toast } from 'react-toastify';


export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


    const [dToken,setDToken] = useState(localStorage.getItem("dToken") || "");
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)


   const [appointments,setAppointmetns]=useState([])
   const getAppointments=async()=>{
    try {
        const {data}=await axios.get(backendUrl + '/api/doctor/appointments', { headers: { Authorization: `Bearer ${dToken}` } })
        if(data.success){
            setAppointmetns(data.appointments.reverse())
            console.log('appointments=',data.appointments.reverse())
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
   }
   const completeAppointment=async(appointmentId)=>{
     try {

        const {data}=await axios.post(backendUrl + '/api/doctor/complete-appointment',{appointmentId}, { headers: { Authorization: `Bearer ${dToken}` } })
          console.log(data)
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message) 
        }

     } catch (error) {
        console.log(error)
        toast.error(error.message)
     }
   }

   const cancelAppointment=async(appointmentId)=>{
    try {

       const {data}=await axios.post(backendUrl + '/api/doctor/cancel-appointment',{appointmentId}, { headers: { Authorization: `Bearer ${dToken}` } })

       if(data.success){
           toast.success(data.message)
           getAppointments()
       }else{
           toast.error(data.message)
       }

    } catch (error) {
       console.log(error)
       toast.error(error.message)
    }
  }
  const getDashData=async()=>{
   try {
    const {data}=await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { Authorization: `Bearer ${dToken}` } })
    if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData)
    }else{
        toast.error(data.message)
    }
   } catch (error) {
    console.log(error)
       toast.error(error.message)
   }
  }

  const getProfileData=async()=>{
    try {
     const {data}=await axios.get(backendUrl + '/api/doctor/profile', { headers: { Authorization: `Bearer ${dToken}` } })
     if(data.success){
         setProfileData(data.profileData)
         console.log(data.profileData)
     }else{
         toast.error(data.message)
     }
    } catch (error) {
     console.log(error)
        toast.error(error.message)
    }
   }

    const value={
        dToken,setDToken,
        backendUrl,
        appointments,setAppointmetns,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,setDashData,getDashData,
        profileData,setProfileData,getProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
              {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider