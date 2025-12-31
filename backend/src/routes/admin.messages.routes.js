import express from "express";
import { getAllMessages } from "../controllers/admin.messages.controller.js";

const router = express.Router();

// GET all contact messages (admin)
router.get("/", getAllMessages);

export default router;
