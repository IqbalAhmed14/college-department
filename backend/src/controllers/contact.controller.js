import pool from "../config/db.js";

// POST contact message
export const submitContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required"
    });
  }

  try {
    await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject, message]
    );

    res.status(201).json({ message: "Message submitted successfully" });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ error: "Failed to submit contact message" });
  }
};
