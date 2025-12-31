import express from "express";
import multer from "multer";
import {
  getResources,
  addResource,
  deleteResource
} from "../controllers/resources.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// APIs
router.get("/", getResources);
router.post("/", upload.single("file"), addResource);
router.delete("/:id", deleteResource);

export default router;
