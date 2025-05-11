import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Toggle doctor availability
const changeAvailibility = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    docData.available = !docData.available;
    await docData.save();

    res.json({ success: true, message: "Availability updated successfully", available: docData.available });
  } catch (error) {
    console.error("changeAvailability Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctor list
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("doctorList Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("loginDoctor Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get doctor's appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const appointments = await appointmentModel.find({ docId });

    if (!appointments.length) {
      return res.status(404).json({ success: false, message: "No appointments found" });
    }

    res.json({ success: true, appointments });
  } catch (error) {
    console.error("appointmentsDoctor Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Complete an appointment
const completeAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    console.log("Received Data:", req.body);
    console.log("Received Data:", req.appointmentId);

    if (!docId || !appointmentId) {
      return res.status(400).json({ success: false, message: "Doctor ID and Appointment ID are required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    appointmentData.isCompleted = true;
    await appointmentData.save();

    res.json({ success: true, message: "Appointment completed successfully" });
  } catch (error) {
    console.error("completeAppointment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    console.log("Received Data:", req.body);

    if (!docId || !appointmentId) {
      return res.status(400).json({ success: false, message: "Doctor ID and Appointment ID are required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    appointmentData.cancelled = true;
    await appointmentData.save();

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("cancelAppointment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorDashboard=async(req,res)=>{
  try {
    const {docId}=req.body
    const  appointments=await appointmentModel.find({docId})
    let earnings=0;
    appointments.map((item)=>{
      if(item.isCompleted || item.payment){
        earnings+=item.amount
      }
    })
    let patinets=[]
    appointments.map((item)=>{
     if(!patinets.includes(item.userId)){
      patinets.push(item.userId)
     }
    })
    const dashData={
      earnings,
      appointments:appointments.length,
      patinets:patinets.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})
  } catch (error) {
    console.error("internal server error to fetch dash data:", error);
  }
}
const doctorProfile=async(req,res)=>{
  try {
    const {docId}=req.body
    const profileData=await doctorModel.findById(docId).select("-password")
    res.json({success:true,profileData})
  } catch (error) {
    console.error("internal server error to fetch profile data:", error);

  }
}
// api to update doctor profile data from doctor panel
const updateDoctorProfile=async(req,res)=>{
  try {
    const {docId,fees ,address,available}=req.body
    await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
    res.json({success:true,message:"Profile Updated"})
  } catch (error) {
    console.error("internal server error to fetch profile data:", error);

  }
}
export {
  changeAvailibility,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  completeAppointment,
  cancelAppointment,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
