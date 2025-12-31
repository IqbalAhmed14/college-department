import pool from "../config/db.js";

/* ============================
   GET all faculty
============================ */
export const getAllFaculty = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        designation,
        qualification,
        email,
        bio,
        image_url,
        created_at
      FROM faculty
      ORDER BY id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Faculty List Error:", error);
    res.status(500).json({ error: "Failed to fetch faculty list" });
  }
};

/* ============================
   GET faculty by ID
============================ */
export const getFacultyById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM faculty WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Faculty Detail Error:", error);
    res.status(500).json({ error: "Failed to fetch faculty details" });
  }
};

/* ============================
   ADD faculty (ADMIN)
============================ */
export const addFaculty = async (req, res) => {
  const {
    name = "",
    designation = "",
    qualification = "",
    email = "",
    bio = ""
  } = req.body;

  const imageUrl = req.file
    ? `/uploads/faculty/${req.file.filename}`
    : null;

  // ✅ Safe validation (FormData compatible)
  if (
    !name.trim() ||
    !designation.trim() ||
    !qualification.trim() ||
    !email.trim() ||
    !bio.trim()
  ) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO faculty
        (name, designation, qualification, email, bio, image_url)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        name.trim(),
        designation.trim(),
        qualification.trim(),
        email.trim(),
        bio.trim(),
        imageUrl
      ]
    );

    res.status(201).json({
      success: true,
      faculty: result.rows[0]
    });

  } catch (error) {
    // ✅ Duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        error: "Faculty with this email already exists"
      });
    }

    console.error("Add Faculty Error:", error);
    res.status(500).json({ error: "Failed to add faculty" });
  }
};

/* ============================
   UPDATE faculty (ADMIN)
============================ */
export const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const {
    name = "",
    designation = "",
    qualification = "",
    email = "",
    bio = ""
  } = req.body;

  const imageUrl = req.file
    ? `/uploads/faculty/${req.file.filename}`
    : null;

  try {
    await pool.query(
      `
      UPDATE faculty
      SET
        name = $1,
        designation = $2,
        qualification = $3,
        email = $4,
        bio = $5,
        image_url = COALESCE($6, image_url)
      WHERE id = $7
      `,
      [
        name.trim(),
        designation.trim(),
        qualification.trim(),
        email.trim(),
        bio.trim(),
        imageUrl,
        id
      ]
    );

    res.json({ success: true });

  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "Faculty with this email already exists"
      });
    }

    console.error("Update Faculty Error:", error);
    res.status(500).json({ error: "Failed to update faculty" });
  }
};

/* ============================
   DELETE faculty (ADMIN)
============================ */
export const deleteFaculty = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM faculty WHERE id = $1",
      [id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Delete Faculty Error:", error);
    res.status(500).json({ error: "Failed to delete faculty" });
  }
};