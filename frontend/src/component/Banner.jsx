import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-xl px-8 sm:px-12 md:px-16 lg:px-20  md:mx-10  overflow-visible">
            {/* Left Side */}
            <div className="flex flex-col text-center md:text-left space-y-4 max-w-md z-10 flex-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Book an Appointment</h1>
                <p className="text-base md:text-lg text-gray-100">Consult with 100% trusted doctors at your convenience.</p>
                <button 
                    onClick={() => { navigate('/login'); scrollTo(0, 0); }} 
                    className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-all shadow-md">
                    Create Account
                </button>
            </div>
            
            {/* Center Image */}
            <div className="flex-1 flex items-center justify-center relative">
                <img 
                    className="w-60 md:w-72 lg:w-80 object-contain" 
                    src={assets.appointment_img} 
                    alt="Doctor Appointment"
                />
            </div>
        </div>
    );
};

export default Banner;