import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import eventRoutes from './src/routes/eventRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import rsvpRoutes from "./src/routes/rsvpRoutes.js";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
//Routes
app.use("/api/events",eventRoutes);
app.use('/api/auth',authRoutes);
app.use("/api/admin", adminRoutes); // Mount admin routes
//Register RSVP routes
app.use("/api/rsvp",rsvpRoutes);
connectDB();
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`🚀 Server running on port ${PORT}`);
})