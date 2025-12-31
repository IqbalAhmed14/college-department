import pool from "../config/db.js";

// GET all resources (already working)
export const getResources = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, resource_type, file_url, created_at FROM resources ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Resources Error:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

// POST add resource
export const addResource = async (req, res) => {
  try {
    const { title, resource_type } = req.body;
    const file_url = `/uploads/${req.file.filename}`;

    await pool.query(
      "INSERT INTO resources (title, resource_type, file_url) VALUES ($1, $2, $3)",
      [title, resource_type, file_url]
    );

    res.json({ message: "Resource uploaded successfully" });
  } catch (error) {
    console.error("Add Resource Error:", error);
    res.status(500).json({ error: "Failed to upload resource" });
  }
};

// DELETE resource
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM resources WHERE id = $1", [id]);
    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resource" });
  }
};
