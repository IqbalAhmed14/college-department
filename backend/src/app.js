// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import departmentRoutes from "./routes/department.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import resourcesRoutes from "./routes/resources.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import adminAuthRoutes from "./routes/admin.auth.routes.js";
import adminMessagesRoutes from "./routes/admin.messages.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

/* ================================
   CORS
================================ */
const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", corsOptions.origin.join(","));
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

/* ================================
   BODY PARSERS
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   STATIC FILE SERVING
================================ */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* ================================
   HEALTH CHECK
================================ */
app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

/* ================================
   ROUTES
================================ */
app.use("/api/department", departmentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gallery", galleryRoutes);

app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/messages", adminMessagesRoutes);

/* ================================
   404
================================ */
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

/* ================================
   ERROR HANDLER
================================ */
app.use(errorHandler);

export default app;
