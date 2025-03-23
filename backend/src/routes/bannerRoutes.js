import express from 'express';
import {getBanner,updateBanner} from '../controllers/bannerController.js';
import {protect} from "../middleware/authMiddleware.js";
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router=express.Router();
router.get("/",getBanner);
router.put("/",protect,authorizeRoles("admin"),updateBanner);
export default router;