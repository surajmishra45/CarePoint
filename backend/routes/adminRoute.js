import express from 'express'
import { addDoctor, adminDash, allDoctors, appointmentCancle, appointmnetAdmin, loginAdmin } from '../controller/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import {changeAvailibility} from '../controller/doctorController.js';

const adminRouter=express.Router();

adminRouter.post('/add-doctor' ,authAdmin,upload.single('image'),addDoctor)
console.log("login admin")

adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailibility)
adminRouter.get('/appointments',authAdmin,appointmnetAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancle)
adminRouter.get('/dashboard',authAdmin,adminDash)


export default adminRouter