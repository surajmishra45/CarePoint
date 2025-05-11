import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL=process.env.MONGO_URL
const connectDb=async()=>{
    mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("✅ Database connected successfully!");
      })
      .catch((error) => {
        console.error(`❌ Database connection error: ${error.message}`);
        process.exit(1); // Exit process with failure
      });
}

export default connectDb