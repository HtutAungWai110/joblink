import express from "express";

import { addApplication, getAllApplications } from "../controllers/applicationControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addApplication)
router.get("/all", authMiddleware, getAllApplications)

export default router;