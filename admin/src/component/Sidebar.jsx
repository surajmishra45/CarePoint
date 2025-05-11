import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { Token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!Token && !dToken) return null; // Hide sidebar if no one is logged in

  return (
    <div className="w-64 h-screen bg-white text-gray-900 p-4 mt-20 flex flex-col shadow-md">
      <ul className="space-y-4">
        {/* Admin Sidebar */}
        {Token && (
          <>
            <NavLink
              to={"/admin-dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
              <p>Admin Dashboard</p>
            </NavLink>

            <NavLink
              to={"/all-appointment"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-6 h-6"
              />
              <p>All Appointments</p>
            </NavLink>

            <NavLink
              to={"/add-doctor"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
              <p>Add Doctor</p>
            </NavLink>

            <NavLink
              to={"/doctor-list"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              <img
                src={assets.list_icon}
                alt="Doctor List"
                className="w-6 h-6"
              />
              <p>Doctor List</p>
            </NavLink>
          </>
        )}

        {/* Doctor Sidebar */}
        {dToken && (
          <>
            <NavLink
              to={"/doctor-dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
              <p>Doctor Dashboard</p>
            </NavLink>

            <NavLink
              to={"/doctor-appointments"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-6 h-6"
              />
              <p>My Appointments</p>
            </NavLink>

            <NavLink
              to={"/doctor-profile"}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              <img
                src={assets.list_icon}
                alt="Patient List"
                className="w-6 h-6"
              />
              <p>Profile</p>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
