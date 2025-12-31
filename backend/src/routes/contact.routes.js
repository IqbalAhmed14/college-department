import express from "express";
import {
  submitContactMessage
} from "../controllers/contact.controller.js";

const router = express.Router();

// POST contact form
router.post("/", submitContactMessage);

export default router;
