import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import {  toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
    const { setAtoken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext) || {}; // Ensure setDToken exists

    const [role, setRole] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    console.log("Backend URL:", backendUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            let response;

            if (role === "Admin") {
                response = await axios.post(`${backendUrl}/api/admin/login`, {
                    email,
                    password,
                });

                if (response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    setAtoken(response.data.token);
                    console.log("Admin Login Successful:", response.data);
                    toast.success("Admin Login Successful");
                }
            } else {
                response = await axios.post(`${backendUrl}/api/doctor/login`, {
                    email,
                    password,
                });

                if (response.data.success) {
                    localStorage.setItem("dToken", response.data.token);
                    if (setDToken) setDToken(response.data.token); // Store token for Doctor
                    console.log("Doctor Login Successful:", response.data);
                    toast.success("Doctor Login Successful");
                }
            }

            if (!response.data.success) {
                throw new Error(response.data?.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login Error:", err);

            // Show toast error if backend sends a message
            const errorMessage = err.response?.data?.message || "Login failed!";
            toast.error(errorMessage);

            setError("Failed to login. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                className="bg-white shadow-lg rounded-lg p-8 w-96 space-y-4"
                onSubmit={handleSubmit}
            >
                {/* Role Selection */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{role} Login</h2>
                    <select
                        className="border p-2 rounded"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>

            {/* Toast Notification Container */}
          
        </div>
    );
};

export default Login;
