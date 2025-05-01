import express from "express";
import { register, login } from "../controller/authController.js"; 


const router = express.Router();

// Routes for user authentication
router.post("/register", register);
router.post("/login", login);

export default router;