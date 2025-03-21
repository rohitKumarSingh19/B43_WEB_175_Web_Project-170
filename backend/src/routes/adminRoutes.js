import express from 'express';
import {getAllUsers,getAllEvents} from '../controllers/adminController.js';
import {protect} from '../middleware/authMiddleware.js';
import {authorizeRoles} from '../middleware/roleMiddleware.js';
const router=express.Router();
// ✅ Fetch all users (only admins can access)
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
// ✅ Fetch all events
router.get("/events", protect, authorizeRoles("admin"), getAllEvents);
export default router;