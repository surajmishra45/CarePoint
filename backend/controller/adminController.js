import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

dotenv.config(); // Load environment variables

const addDoctor = async (req, res) => {
    try {
      const { name, email, password, speciality, degree, experience, about, fees, address, available } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Required fields are missing!" });
      }
  
      // ✅ Ensure file is received
      const imageFile = req.file ? req.file.path : null;
      console.log("Received Image:", imageFile);
  
      // ✅ Hash password
      const passwordHashing = await bcrypt.hash(password, 10);
  
      // ✅ Upload to Cloudinary (if needed)
      let image_url = null;
      if (imageFile) {
        const uploadImage = await cloudinary.uploader.upload(imageFile, { resource_type: "image" });
        image_url = uploadImage.secure_url;
      }
  
      // ✅ Save doctor details
      const newDoctor = new doctorModel({
        name,
        email,
        password: passwordHashing,
        speciality,
        degree,
        experience,
        about,
        fees,
        available,
        address: JSON.parse(address),
        image: image_url,
      });
  
      await newDoctor.save();
      res.json({ success: true, message: "Doctor added successfully!" });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error adding doctor" });
    }
  };


const loginAdmin = (req, res) => {
    console.log("🔐 Admin Login Controller Triggered");

    try {
        const { email, password } = req.body;

        // ✅ Validate Credentials
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "❌ Invalid email or password",
            });
        }

        // ✅ Create JWT Token (with an expiration)
        const token = jwt.sign(
            { email },  // Payload (only storing email for security)
            process.env.JWT_SECRET, 
            { expiresIn: "7d" } // Set expiration time
        );

        res.json({
            success: true,
            message: "✅ Admin logged in successfully",
            token,
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({
            success: false,
            message: "🚨 Could not log in due to server error",
        });
    }
};

// Api to get all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");

        if (doctors.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No doctors found",
            });
        }

        res.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};
// api to get all appointment doctors list
const appointmnetAdmin=async(req,res)=>{
   try {
     const appointments=await appointmentModel.find({})
     res.json({success:true,appointments})
   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message
      })
   }
}

// api for cancle appointment

const appointmentCancle = async (req, res) => {
    try {
        const {  appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        // verify appointment user
       
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        // release doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "appointment cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const adminDash = async (req, res) => {
    try {
        const doctors = await doctorModel.countDocuments();
        const patients = await userModel.countDocuments();
        const appointments = await appointmentModel.countDocuments();
        const latestAppointments = await appointmentModel.find()
            .sort({ createdAt: -1 }) // Get latest appointments
            .limit(5);

        const dashData = { doctors, appointments, patients, latestAppointments };

        console.log(dashData);
        res.status(200).json({ success: true, dashData });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Export all functions as named exports
export { addDoctor, loginAdmin, allDoctors ,appointmnetAdmin,appointmentCancle,adminDash};
