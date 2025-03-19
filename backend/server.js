import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import eventRoutes from './src/routes/eventRoutes.js';
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
//Routes
app.use("/api/events",eventRoutes);
connectDB();
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`🚀 Server running on port ${PORT}`);
})