// server.js
import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server only after DB is reachable
(async () => {
  try {
    // Simple ping to ensure DB is ready
    await pool.query("SELECT 1");
    console.log("✅ Database ready");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();

