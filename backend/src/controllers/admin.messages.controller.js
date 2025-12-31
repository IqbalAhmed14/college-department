import pool from "../config/db.js";

// GET all contact messages (Admin)
export const getAllMessages = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, subject, message, created_at
       FROM contact_messages
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Admin Messages Error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};



