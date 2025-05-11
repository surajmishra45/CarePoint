import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { FaDollarSign, FaCalendarCheck, FaUsers, FaCheck, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dToken) {
      getDashData().finally(() => setLoading(false));
    }
  }, [dToken]);

  if (loading) {
    return <p className="text-gray-600 text-center mt-10">Loading dashboard data...</p>;
  }

  if (!dashData) {
    return <p className="text-gray-600 text-center mt-10">Failed to load data.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Earnings Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Earnings */}
        <DashboardCard title="Total Earnings" count={`$${dashData.earnings}`} icon={<FaDollarSign className="text-green-500 text-4xl" />} />
        
        {/* Appointments */}
        <DashboardCard title="Appointments" count={dashData.appointments} icon={<FaCalendarCheck className="text-purple-500 text-4xl" />} />
        
        {/* Patients */}
        <DashboardCard title="Patients" count={dashData.
patinets
} icon={<FaUsers className="text-blue-500 text-4xl" />} />
      </div>

      {/* Latest Appointments */}
      <div className="col-span-3 bg-white p-6 shadow-md rounded-lg mt-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaCalendarCheck className="text-blue-500" /> Latest Appointments
        </h2>

        {dashData.latestAppointments?.length > 0 ? (
          <ul className="mt-4 divide-y">
            {dashData.latestAppointments.map((appointment, index) => (
              <li key={index} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <img
                    src={appointment.docData?.image || '/default-avatar.png'}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{appointment.patientName}</p>
                    <p className="text-sm text-gray-500">Booking on {appointment.slotDate}</p>
                  </div>
                </div>

                {/* Appointment Status & Actions */}
                {appointment.cancelled ? (
                  <span className="text-red-600 font-semibold">Cancelled</span>
                ) : appointment.isCompleted ? (
                  <span className="text-green-600 font-semibold">Completed</span>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => completeAppointment(appointment._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition flex items-center"
                    >
                      <FaCheck className="mr-1" /> Complete
                    </button>
                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center"
                    >
                      <FaTimes className="mr-1" /> Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No recent appointments</p>
        )}
      </div>
    </div>
  );
};

// Reusable Dashboard Card Component
const DashboardCard = ({ title, count, icon }) => (
  <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-3xl font-bold text-gray-800">{count}</p>
    </div>
    {icon}
  </div>
);

export default DoctorDashboard;
