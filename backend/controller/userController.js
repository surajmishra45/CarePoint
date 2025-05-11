import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
// api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            console.log(name, email, password)
            return res.json({ success: false, message: "missing details" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })

        }
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a  strong password" })

        }
        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = await userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.json({ success: false, message: "User does not exist" });

    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.json({ success: true, token })
    } else {
        return res.json({
            success: false, message: "invalid credentials"
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        console.log(userId)
        const userData = await userModel.findById(userId).select("-password")
        console.log(userData)
        return res.json({ success: true, userData })
    } catch (error) {
        console.log("error to get profile", error)
        return res.json({
            success: false, message: error.message
        })
    }
}



const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender,city,state,zipCode,country } = req.body;
        const imageFile = req.file;

        // ✅ Proper validation check
        if (!name || !phone || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Data missing" });
        }

        // ✅ Update user details (excluding image update for now)
        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address), // Ensure address is properly parsed
            dob,
            gender,
            city,
            state,
            zipCode,
            country,
        });

        // ✅ Upload image only if provided
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            // Update user's profile image
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        // ✅ Send success response only after everything is done
        res.json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // ✅ Validation: Check required fields
        if (!userId || !docId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Fetch doctor details & ensure availability
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        console.log("Doctor Data:", docData);

        if (!docData.available) {

            return res.status(400).json({ success: false, message: "Doctor not available" });
        }

        // ✅ Ensure `slots_booked` exists and is an object
        let slots_booked = docData.slots_booked || {};

        console.log("Current Slots Booked:", slots_booked);

        // ✅ Normalize `slotTime`
        const normalizedSlotTime = slotTime.trim();

        // ✅ Check if slot is already booked
        if (slots_booked[slotDate] && slots_booked[slotDate].includes(normalizedSlotTime)) {
            return res.status(400).json({ success: false, message: "Selected slot is already booked" });
        }

        // ✅ Add the new slot
        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }
        slots_booked[slotDate].push(normalizedSlotTime);

        // ✅ Fetch user data
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Remove `slots_booked` from `docData` before storing in appointment
        const { slots_booked: _, ...docInfo } = docData.toObject();

        // ✅ Create a new appointment
        const newAppointment = new appointmentModel({
            userId,
            docId,
            slotDate,
            slotTime: normalizedSlotTime,
            userData,
            docData: docInfo,
            amount: docData.fees,
            date: Date.now(),
        });

        // ✅ Save the new appointment
        await newAppointment.save();

        // ✅ Update doctor's booked slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        console.log("Updated Doctor Slots:", await doctorModel.findById(docId).select("slots_booked"));

        return res.json({
            success: true,
            message: "Appointment booked successfully!",
        });

    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// hapi to get appointment for frontend my-appointment
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({
            success: false, message: error.message
        })
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "unauthorize access" })
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        // release doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "message cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const razorpayInstance = new razorpay(
    {
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    }
)

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // Check if appointmentId exists
        if (!appointmentId) {
            return res.json({ success: false, message: "Invalid appointment ID" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        // Check if appointment exists and is not cancelled
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment cancelled or not found" });
        }

        // Validate amount
        if (!appointmentData.amount || isNaN(appointmentData.amount) || appointmentData.amount <= 0) {
            return res.json({ success: false, message: "Invalid payment amount" });
        }

        // Creating options for Razorpay payment
        const options = {
            amount: Math.round(appointmentData.amount * 100), // Convert to smallest currency unit
            currency: process.env.CURRENCY || "INR",
            receipt: appointmentId,
        };

        // Ensure razorpayInstance is defined
        if (!razorpayInstance) {
            return res.json({ success: false, message: "Payment gateway not initialized" });
        }

        // Create order
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error("Razorpay Payment Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// api to verify payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        if (!razorpay_order_id) {
            return res.status(400).json({ success: false, message: "Missing order ID" });
        }

        console.log("Received Order ID:", razorpay_order_id);

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log("Fetched Order Info:", orderInfo);
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true,isCompleted: true })
           return res.json({ success: true, message: "payment successfull" })
        } else {
            res.json({ success: false, message: "payment failed" })
        }
        return res.json({ success: true, orderInfo });
    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { paymentRazorpay, registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, verifyRazorpay };
