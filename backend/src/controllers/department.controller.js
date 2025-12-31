import pool from "../config/db.js";

// GET department details
export const getDepartment = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM department ORDER BY id LIMIT 1"
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Department Error:", error);
    res.status(500).json({ error: "Failed to fetch department details" });
  }
};
