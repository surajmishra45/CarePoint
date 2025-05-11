import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { FaEdit, FaSave } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { profileData, getProfileData, backendUrl, dToken } = useContext(DoctorContext);
  const [loading, setLoading] = useState(true);
  const [edit, setIsEdit] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    getProfileData().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (profileData) {
      setUpdatedProfile({
        address: profileData.address || { line1: '', line2: '' },
        fees: profileData.fees || '',
      });
    }
  }, [profileData]);

  if (loading) {
    return <p className="text-gray-600 text-center mt-10">Loading profile...</p>;
  }

  if (!profileData) {
    return <p className="text-red-600 text-center mt-10">Failed to load profile data.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${dToken}` } }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      {/* Doctor Image and Basic Info */}
      <div className="flex items-center gap-6">
        <img
          src={profileData.image || '/default-avatar.png'}
          alt="Doctor"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{profileData.name}</h1>
          <p className="text-lg text-blue-600">{profileData.specialty}</p>
          <p className="text-gray-500">{profileData.degree}</p>
          <span
            className={`inline-block mt-2 px-4 py-1 text-sm font-semibold rounded-full 
              ${profileData.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
          >
            {profileData.available ? 'Available for Appointments' : 'Not Available'}
          </span>
        </div>
      </div>

      {/* Contact Info - Address */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Contact Info</h2>
        <p className="flex items-center gap-2 text-gray-600 mt-3">
          <MdEmail className="text-blue-500 text-lg" /> {profileData.email}
        </p>
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <MdLocationOn className="text-red-500 text-lg" />
          {edit ? (
            <div className="w-full">
              <input
                type="text"
                name="line1"
                value={updatedProfile.address.line1}
                onChange={handleAddressChange}
                className="border p-2 rounded-lg w-full mt-1"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                name="line2"
                value={updatedProfile.address.line2}
                onChange={handleAddressChange}
                className="border p-2 rounded-lg w-full mt-2"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <span>{profileData.address?.line1}, {profileData.address?.line2}</span>
          )}
        </div>
      </div>

      {/* Fees & Slots Booked */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Appointment Details</h2>
        <div className="flex gap-2 mt-3">
          <strong>Consultation Fee:</strong>
          {edit ? (
            <input
              type="number"
              name="fees"
              value={updatedProfile.fees}
              onChange={handleChange}
              className="border p-2 rounded-lg w-20"
            />
          ) : (
            <span>${profileData.fees}</span>
          )}
        </div>
        <p className="text-gray-600 mt-2"><strong>Slots Booked:</strong> {Object.keys(profileData.slots_booked).length}</p>
      </div>

      {/* Edit & Save Buttons */}
      <div className="mt-6 text-center">
        {edit ? (
          <button
            className="px-5 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg flex items-center gap-2 mx-auto hover:bg-green-600 transition shadow-md"
            onClick={updateProfile}
          >
            <FaSave /> Save Profile
          </button>
        ) : (
          <button
            className="px-5 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg flex items-center gap-2 mx-auto hover:bg-blue-600 transition shadow-md"
            onClick={() => setIsEdit(true)}
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
