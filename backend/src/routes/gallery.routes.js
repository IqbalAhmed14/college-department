import express from "express";
import multer from "multer";
import path from "path";

import {
  getAllGallery,
  addGallery,
  deleteGallery
} from "../controllers/gallery.controller.js";

import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/gallery");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `gallery-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

/* =========================
   ROUTES
========================= */
router.get("/", getAllGallery);

router.post(
  "/",
  adminAuth,
  upload.single("image"),
  addGallery
);

router.delete(
  "/:id",
  adminAuth,
  deleteGallery
);

export default router;
