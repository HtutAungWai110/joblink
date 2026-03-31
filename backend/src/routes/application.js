import express from "express";

import { addApplication } from "../controllers/applicationControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addApplication)

export default router;