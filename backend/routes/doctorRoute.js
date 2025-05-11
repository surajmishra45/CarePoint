import express from 'express'
import {appointmentsDoctor, completeAppointment, doctorList,cancelAppointment, loginDoctor, doctorDashboard, doctorProfile, updateDoctorProfile} from '../controller/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'
const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)

doctorRouter.post('/login',loginDoctor)

doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)

doctorRouter.post('/complete-appointment',authDoctor,completeAppointment)

doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment)

doctorRouter.get('/dashboard',authDoctor,doctorDashboard)

doctorRouter.get('/profile',authDoctor,doctorProfile)

doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter