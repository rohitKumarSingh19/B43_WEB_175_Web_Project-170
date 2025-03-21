import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import { rsvpEvent,getEventRSVPs } from '../controllers/rsvpController.js';
const router=express.Router();
router.post("/:eventId/rsvp",protect,rsvpEvent);
router.get("/:eventId/rsvps",protect,getEventRSVPs);
export default router;
