import express from "express";
import {
  getDepartment
} from "../controllers/department.controller.js";

const router = express.Router();

// GET department details
router.get("/", getDepartment);

export default router;
