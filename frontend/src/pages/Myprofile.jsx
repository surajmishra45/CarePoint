import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    phone: "",
    email: "",
    address: { line1: "", line2: "" },
    dob: "",
    gender: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setUpdatedData({
        name: userData.name || "",
        phone: userData.phone || "",
        email: userData.email || "",
        address: userData.address || { line1: "", line2: "" },
        dob: userData.dob || "",
        gender: userData.gender || "",
      });
    }
  }, [userData]);

  const handleInputChange = (field, value) => {
    setUpdatedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (line, value) => {
    setUpdatedData((prev) => ({
      ...prev,
      address: { ...prev.address, [line]: value },
    }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", userData._id);
      Object.keys(updatedData).forEach((key) => {
        formData.append(key, key === "address" ? JSON.stringify(updatedData[key]) : updatedData[key]);
      });
      if (newImage) formData.append("image", newImage);

      const { data } = await axios.put(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Profile updated successfully!");
        loadUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return userData && (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left Panel */}
          <div className="col-span-1 bg-gradient-to-b from-blue-500 to-indigo-600 text-white p-6 flex flex-col items-center">
            <img
              src={newImage ? URL.createObjectURL(newImage) : userData.image}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-md mb-4"
            />
            {isEdit && <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-white mb-3" />}
            <h1 className="text-2xl font-semibold">{userData.name}</h1>
            <p className="text-sm opacity-80">{userData.email}</p>
            <button
              className="mt-6 px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition"
              onClick={isEdit ? handleSaveChanges : () => setIsEdit(true)}
              disabled={loading}
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {/* Right Panel */}
          <div className="col-span-2 p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name", field: "name", type: "text" },
                { label: "Phone", field: "phone", type: "text" },
                { label: "Email", field: "email", type: "text", readOnly: true },
                { label: "Date of Birth", field: "dob", type: "date" },
              ].map(({ label, field, type, readOnly }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600">{label}</label>
                  {isEdit ? (
                    <input
                      type={type}
                      value={updatedData?.[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full p-2 border rounded-lg text-gray-800"
                      readOnly={readOnly}
                    />
                  ) : (
                    <p className="text-gray-800">{userData[field]}</p>
                  )}
                </div>
              ))}

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Address</label>
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={updatedData?.address?.line1 || ""}
                      onChange={(e) => handleAddressChange("line1", e.target.value)}
                      placeholder="Line 1"
                      className="w-full p-2 border rounded-lg text-gray-800 mb-2"
                    />
                    <input
                      type="text"
                      value={updatedData?.address?.line2 || ""}
                      onChange={(e) => handleAddressChange("line2", e.target.value)}
                      placeholder="Line 2"
                      className="w-full p-2 border rounded-lg text-gray-800"
                    />
                  </>
                ) : (
                  <p className="text-gray-800">
                    {userData?.address?.line1 ? `${userData.address.line1}, ` : ""}
                    {userData?.address?.line2 || ""}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Gender</label>
                {isEdit ? (
                  <select
                    value={updatedData?.gender || ""}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="w-full p-2 border rounded-lg text-gray-800"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{userData.gender}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
