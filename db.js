import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://kashif_user_01:mk1234mk1234@cluster01.cvlyuq1.mongodb.net/WazirX-Task");
        console.log(`Connected to MongoDB Database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
}

export default connectDB;