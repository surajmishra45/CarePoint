import React, { useContext } from 'react';
import { assets } from '../assets/assets/';
import { AdminContext } from '../context/AdminContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const { Token, setAtoken } = useContext(AdminContext);
    const {dToken,setDToken}=useContext(DoctorContext)

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("dToken");
        setDToken("")
        setAtoken("");
        toast.success("✅ Logged out successfully!");
    };

    return (
        <nav className="bg-white shadow-md w-full p-4 flex justify-between items-center  fixed top-0 z-40">
            {/* Logo & Role */}
            <div className="flex items-center space-x-3">
                <img src={assets.admin_logo} alt="Admin Logo" className="" />
                <p className="text-lg font-semibold text-gray-800 px-2 border rounded-full">
                    {Token ? 'Admin' : 'Doctor'}
                </p>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
                Logout
            </button>

        </nav>
    );
};

export default Navbar;
