import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
// import axios from 'axios'
// import { toast } from 'react-toastify';


const AllAppointment = () => {
  const { Token, appointments, getAllAppointment ,cancelAppointment} = useContext(AdminContext);
  const { calculatedAge } = useContext(AppContext);
  console.log('calculatedAge',calculatedAge)

  
  useEffect(() => {
    if (Token) {
      getAllAppointment();
    }
  }, [Token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-scroll">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Appointments</h1>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Patient</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Date & Time</th>
              <th className="py-3 px-6 text-left">Doctor</th>
              <th className="py-3 px-6 text-left">Fees</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((appt, index) => {
                const patientAge = appt.userData?.dob
                  ? calculatedAge(appt.userData.dob)
                  : "N/A";

                return (
                  <tr
                    key={appt._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-6">{index + 1}</td>

                    {/* Patient Name + Image */}
                    <td className="py-3 px-6 flex items-center space-x-3">
                      <img
                        src={appt.userData?.image || "/default-avatar.png"}
                        alt="Patient"
                        className="w-10 h-10 rounded-full border"
                      />
                      <span>{appt.userData?.name || "N/A"}</span>
                    </td>

                    {/* Age Calculation */}
                    <td className="py-3 px-6">{patientAge}</td>

                    {/* Appointment Date & Time */}
                    <td className="py-3 px-6">
                      {appt.slotDate} | {appt.slotTime}
                    </td>

                    {/* Doctor Name */}
                    <td className="py-3 px-6">{appt.docData?.name || "N/A"}</td>

                    {/* Fees */}
                    <td className="py-3 px-6">${appt.docData?.fees || "N/A"}</td>

                    {/* Status Column */}
                    <td className="py-3 px-6">
                      {appt.cancelled ? (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                          Cancelled
                        </span>
                      ) : appt.isCompleted ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                          Completed
                        </span>
                      ) : (
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3 px-6 text-center space-x-2">
                      {!appt.cancelled && (
                        <button onClick={()=>cancelAppointment(appt._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">
                          Cancel
                        </button>
                      )}
                      {!appt.isCompleted && !appt.cancelled && (
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs">
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-600">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointment;
