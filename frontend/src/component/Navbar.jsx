import React, { useState, useContext } from 'react';
import { assets } from './../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaUser, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  const linkClass = ({ isActive }) => `py-1 ${isActive ? 'text-primary font-bold' : 'text-gray-700'}`;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 mx-4 sm:mx-[10%] flex justify-between items-center text-sm py-4 mb-5 border-b border-gray-400 bg-white">
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="cursor-pointer" />

      {/* Desktop Menu */}
      <ul className="xs:hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/" className={linkClass}><li>Home</li></NavLink>
        <NavLink to="/doctors" className={linkClass}><li>All Doctors</li></NavLink>
        <NavLink to="/about" className={linkClass}><li>About</li></NavLink>
        <NavLink to="/contact" className={linkClass}><li>Contact</li></NavLink>
        <a href=" https://effortless-fox-387141.netlify.app/" className="py-1 text-gray-700">Admin Panel</a> 
      </ul>

      <div className="flex items-center gap-4 relative">
        {token ? (
          <div className="relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <img
              className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
              src={userData.image || assets.profile_pic}
              alt="User Profile"
            />
            {showDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-md p-2">
                <button onClick={() => navigate('/my-profile')} className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left">
                  <FaUser /> My Profile
                </button>
                <button onClick={() => navigate('/my-appointments')} className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left">
                  <FaCalendarCheck /> My Appointments
                </button>
                <button onClick={logout} className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-left text-red-600">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-primary text-white px-4 py-2 rounded">Create Account</button>
        )}

        {/* Hamburger Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 h-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-3/4 bg-white text-gray-800 shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:hidden ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-300">
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close Menu Icon" className="w-6 h-6 cursor-pointer" />
        </div>
        <ul className="flex flex-col space-y-4 mt-6 px-6 items-center">
          <NavLink to="/" className={linkClass} onClick={() => setShowMenu(false)}>Home</NavLink>
          <NavLink to="/doctors" className={linkClass} onClick={() => setShowMenu(false)}>All Doctors</NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setShowMenu(false)}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setShowMenu(false)}>Contact</NavLink>
          <a href="http://localhost:3001" className="py-1 text-gray-700" onClick={() => setShowMenu(false)}>Admin Panel</a>
        </ul>
      </div>

      {/* Overlay */}
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${showMenu ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowMenu(false)}></div>
    </div>
  );
};

export default Navbar;
