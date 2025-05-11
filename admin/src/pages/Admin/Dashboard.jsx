import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { FaUserMd, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Dashboard = () => {
  const { dashData, getDashData } = useContext(AdminContext);

  useEffect(() => {
    getDashData(); // Fetch dashboard data when component loads
  }, []);
   console.log(dashData)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {dashData ? (
        <div className="grid grid-cols-3 gap-6">
          {/* Doctors */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Doctors</h2>
              <p className="text-3xl font-bold text-gray-800">{dashData.doctors}</p>
            </div>
            <FaUserMd className="text-blue-500 text-4xl" />
          </div>

          {/* Appointments */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Appointments</h2>
              <p className="text-3xl font-bold text-gray-800">{dashData.appointments}</p>
            </div>
            <FaCalendarCheck className="text-purple-500 text-4xl" />
          </div>

          {/* Patients */}
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Patients</h2>
              <p className="text-3xl font-bold text-gray-800">{dashData.patients}</p>
            </div>
            <FaUsers className="text-green-500 text-4xl" />
          </div>

          {/* Latest Appointments */}
          <div className="col-span-3 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaCalendarCheck className="text-blue-500" /> Latest Appointments
            </h2>

            <ul className="mt-4">
              {dashData.latestAppointments?.length > 0 ? (
                dashData.latestAppointments.map((appt, index) => (
                  <li key={index} className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-4">
                      <img src={appt.docData.image} alt="Doctor" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-700">{appt.patientName}</p>
                        <p className="text-sm text-gray-500">Booking on {appt.slotDate}</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:bg-red-100 p-2 rounded-full">
                      <IoMdClose className="text-xl" />
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No recent appointments</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Loading dashboard data...</p>
      )}
    </div>
  );
};

export default Dashboard;
