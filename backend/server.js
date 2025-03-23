import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import connectDB from './src/config/db.js';
import eventRoutes from './src/routes/eventRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import rsvpRoutes from "./src/routes/rsvpRoutes.js";
import bannerRoutes from './src/routes/bannerRoutes.js'
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Routes
app.use("/api/events",eventRoutes);
app.use('/api/auth',authRoutes);
app.use("/api/admin", adminRoutes); // Mount admin routes
//Register RSVP routes
app.use("/api/rsvp",rsvpRoutes);
// ✅ Serve static images (for banners & uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/banner",bannerRoutes);
connectDB();
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`🚀 Server running on port ${PORT}`);
})