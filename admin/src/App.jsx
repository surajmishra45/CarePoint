import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';

import Login from './pages/Login';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';

import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';

import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { Token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}

      {dToken || Token ? (
        <div className="flex h-screen flex-col">
          <Navbar />
          <div className="flex flex-1">
            { <Sidebar />} {/* Sidebar only for Admin */}
            <div className="flex-1 bg-gray-100 mt-18 p-4">
              <Routes>
                {/* Redirect '/' to appropriate dashboard */}
                {/* <Route path="/" element={Token ? <Navigate to="/admin-dashboard" /> : <Navigate to="/doctor-dashboard" />} /> */}

                {/* Admin Routes */}
                {Token && (
                  <>
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/all-appointment" element={<AllAppointment />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/doctor-list" element={<DoctorList />} />
                  </>
                )}

                {/* Doctor Routes */}
                {dToken && (
                  <>
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/doctor-appointments" element={<DoctorAppointment />} />
                    <Route path="/doctor-profile" element={<DoctorProfile />} />
                  </>
                )}

                {/* 404 Route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
