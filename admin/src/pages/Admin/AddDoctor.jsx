import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [address1, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const {backendUrl,Token}=useContext(AdminContext)


  const submitHandle = async (e) => {
    e.preventDefault();
  
    if (!docImg) {
      return toast.error("Please select an image!"); // Prevents sending empty image
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("about", about);
    formData.append("degree", degree);
    formData.append("speciality", speciality);
    formData.append("fees", Number(fees));
    formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
    formData.append("image", docImg); // ✅ Ensure image is appended
  
    // ✅ Correctly log FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key} :`, value instanceof File ? value.name : value);
    }
  
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Important for file uploads
          Token,
        },
      });
  
      if (data.success) {
        toast.success(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1");
        setAbout("");
        setDegree("");
        setSpeciality("General Physician");
        setFees("");
        setAddress("");
        setAddress2("");
        setDocImg(null); // ✅ Reset Image State
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor"); // ✅ Better error handling
    }
  };
   
  return (
    <form onSubmit={submitHandle} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6 border border-gray-200">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800">Add Doctor</h2>

      {/* Upload Section */}
      <div className="flex items-center space-x-3">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="Upload"
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 hover:border-blue-500 transition"
          />
        </label>
        <input
          type="file"
          id="doc-img"
          hidden
          onChange={(e) => setDocImg(e.target.files[0])}
        />
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">Upload</p>
          <p className="text-sm text-gray-500">Doctor Picture</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Doctor Email</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Speciality Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Speciality</label>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option>General Physician</option>
            <option>Gynecologist</option>
            <option>Dermatologist</option>
            <option>Pediatrician</option>
            <option>Neurologist</option>
            <option>Gastroenterologist</option>
          </select>
        </div>

        {/* Fees */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Consultation Fee ($)</label>
          <input
            type="number"
            placeholder="Enter Fee"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            required
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Experience Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6+">6+</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Education</label>
          <input
            type="text"
            placeholder="Degrees & Certifications"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            placeholder="Street Address"
            value={address1}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="City, State, Zip"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* About Me */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">About Me</label>
          <textarea
            placeholder="Write about the doctor..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
