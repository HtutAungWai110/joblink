import express from "express";
import { register, login } from "../controllers/authControllers.js";
import { lockMiddleware } from "../middleware/lockMiddleware.js";
const router = express.Router();

router.post("/register",  register)
router.post("/login", lockMiddleware, login)

export default router;
