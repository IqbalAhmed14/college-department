import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  getAllFaculty,
  getFacultyById,
  addFaculty,
  updateFaculty,
  deleteFaculty
} from "../controllers/faculty.controller.js";

import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

/* ============================
   ENSURE UPLOAD DIRECTORY
============================ */
const uploadDir = "uploads/faculty";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ============================
   MULTER CONFIG (Faculty Image)
============================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `faculty-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

/* ============================
   PUBLIC ROUTES
============================ */
router.get("/", getAllFaculty);
router.get("/:id", getFacultyById);

/* ============================
   ADMIN ROUTES
============================ */
router.post(
  "/",
  adminAuth,
  upload.single("image"),
  addFaculty
);

router.put(
  "/:id",
  adminAuth,
  upload.single("image"),
  updateFaculty
);

router.delete(
  "/:id",
  adminAuth,
  deleteFaculty
);

export default router;
