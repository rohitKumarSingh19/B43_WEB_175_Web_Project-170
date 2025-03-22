import express from 'express';
import {createEvent,getEvents,deleteEvent} from '../controllers/eventController.js';
import { getUpcomingEvents,getPastEvents } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router=express.Router();
router.post('/create',protect,authorizeRoles('organizer','admin'),createEvent);
router.get('',getEvents);
router.delete("/:id",protect,authorizeRoles("admin"),deleteEvent);
//Routes for filtering
router.get("/upcoming",getUpcomingEvents);
router.get("/past",getPastEvents);
export default router;