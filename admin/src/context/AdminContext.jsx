import { createContext, useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify"; // Ensure you import toast if using it

export const AdminContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const AdminContextProvider = (props) => {
    const [Token, setAtoken] = useState(localStorage.getItem("token") || "");
    const [doctors, setDoctors] = useState([]);
    const [appointments,setAppointment]=useState([])
    const [dashData,setDashData]=useState(false)

    const getAllDoctors = async () => {
        try {
            const {data}  = await axios.post(
                `${backendUrl}/api/admin/all-doctors`, 
                {}, 
                { headers: { Authorization: `Bearer ${Token}` } } // Correct header format
            );

            if (data.success) {
                setDoctors(data.doctors);
                console.log("doctors=", data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error("Failed to fetch doctors.");
        }
    };

    const changeAvailability = async (docId) => {
        try {
            // ✅ Extract docId from req.body
            
            
            if (!docId) {
                return toast.error("Doctor ID is missing!");
            }
    
            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`, 
                { docId }, 
                { headers: { Token } } // ✅ Correct header format
            );
    
            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); // Refresh doctor list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const getAllAppointment=async()=>{
       try {
        const {data}=await axios.get(backendUrl + '/api/admin/appointments',{headers:{Token}})
        if(data.success){
           setAppointment(data.appointments)
           console.log(data.appointments)
        }else{
            toast.error(data.message)
        }
       } catch (error) {
         console.log(error)
         toast.error(error.message)
       }
    }
    
  // cancel appointment
  const cancelAppointment=async(appointmentId)=>{
    try {
       const {data}=await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId},{headers:{Token}})
       if(data.success){
        toast.success(data.message)
         getAllAppointment()
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

//   get data 
const getDashData=async()=>{
    try {
        console.log("inside dashdata")
       const {data}=await axios.get(backendUrl + '/api/admin/dashboard',{headers:{Token}})
       if(data.success){
         setDashData(data.dashData)
         console.log("dashdata=",data.dashData)         
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
    
    console.log("token=", Token,dashData);

    const value = {
        Token,
        setAtoken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,setAppointment,
        getAllAppointment,
        cancelAppointment,
        dashData,
        getDashData,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
