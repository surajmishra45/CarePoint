import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DoctorAppointment = () => {
    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
    const { calculatedAge, formatSlotDate } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">All Appointments</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {appointments.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <tr key={appointment._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{appointment?.userData?.name || "N/A"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <span className={`px-2 py-1 text-sm font-semibold rounded-full ${appointment?.payment ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {appointment?.payment ? 'Online' : 'Cash'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{appointment?.userData?.dob ? calculatedAge(appointment.userData.dob) : "N/A"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{appointment?.slotDate ? formatSlotDate(appointment.slotDate) : "N/A"} {appointment?.slotTime}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">${appointment?.amount || "N/A"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
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
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500 text-sm">No appointments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorAppointment;
