import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import path from 'path'

dotenv.config();

const app=express()
const PORT=process.env.PORT || 4000
connectCloudinary()
// MIDDLEWARE
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data
const __dirname=path.resolve();


// api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.use(express.static(path.join(__dirname, "admin/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "admin", "dist", "index.html"));
});

app.get('/',(req,res)=>{
    res.send('Api World')

})
app.listen(PORT,()=>{
    connectDb()
    console.log(`server started at port ${PORT}`)
})