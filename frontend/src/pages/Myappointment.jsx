import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { token, backendUrl ,getDoctorData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate=useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        console.log("data",data)
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // Function to format date as "22 Aug 2025"
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [day, month, year] = dateString.split("_");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return formattedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // cancel appointment
  const cancelAppointment=async(appointmentId)=>{
    try {
       const {data}=await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId},{headers:{token}})
       if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorData()

       }else{
        toast.error(data.message)
       }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // Ensure correct environment variable
    amount: order.amount, // Fix typo here (was "amout")
    currency: order.currency,
    name: "Appointment Payment",
    description: "Appointment Payment",
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/user/verifyRazorpay",
          response,
          { headers: { token } }
        );

        if (data.success) {
          getUserAppointments(); // Refresh user appointments
          console.log(data)
          navigate("/my-appointments"); // Redirect after successful payment
          toast.success("Payment successful!");
        } else {
          toast.error("Payment verification failed.");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        toast.error(error.response?.data?.message || "Payment verification error.");
      }
    },
    prefill: {
      email: "user@example.com", // Optionally prefill user details
      contact: "9999999999",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const appointmentRazorpay = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/user/payment-razorpay",
      { appointmentId },
      { headers: { token } }
    );

    if (data.success) {
      console.log("Order Created:", data.order);
      initPay(data.order);
    } else {
      toast.error("Failed to create Razorpay order.");
    }
  } catch (error) {
    console.error("Payment Error:", error);
    toast.error(error.response?.data?.message || "Error initiating payment.");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition duration-300"
            >
              {/* Doctor Image */}
              <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={appointment?.docData?.image || "https://via.placeholder.com/150"}
                  alt={appointment?.docData?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor & Appointment Details */}
              <div className="flex-1 px-4">
                <h2 className="text-lg font-bold text-gray-700">
                  Dr. {appointment?.docData?.name || "N/A"}
                </h2>
                <p className="text-sm text-blue-600">
                  {appointment?.docData?.speciality || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Address:</span>{" "}
                  {appointment?.docData?.address?.line1 || "N/A"}
                </p>
                <p className="text-sm text-gray-900 font-semibold mt-1">
                  Date & Time: {formatDate(appointment?.slotDate)} |{" "}
                  {appointment?.slotTime || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Patient:</span>{" "}
                  {appointment?.userData?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Patient Contact:</span>{" "}
                  {appointment?.userData?.phone || "N/A"}
                </p>
              </div>

              {/* Action Buttons in a Row */}
              <div className="flex space-x-4">
              {
                  !appointment.cancelled && appointment.payment && <button className="px-4 py-2 border border-gray-400 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 transition">
                  Paid
                </button>
                }
                {
                  !appointment.cancelled && !appointment.payment  && <button onClick={()=>appointmentRazorpay(appointment._id)} className="px-4 py-2 border border-gray-400 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 transition">
                  Pay Online
                </button>
                }
                {
                  !appointment.cancelled && <button onClick={()=>cancelAppointment(appointment._id)} className="px-4 py-2 border border-red-400 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition">
                  Cancel Appointment
                </button>
                }
                {appointment.cancelled && <button className="px-4 py-2 border border-red-400 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition">Cancelled Appointment</button>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
