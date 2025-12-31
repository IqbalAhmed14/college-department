import pool from "../config/db.js";
import fs from "fs";
import path from "path";

/* =========================
   GET ALL GALLERY ITEMS
========================= */
export const getAllGallery = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, image_url, created_at
      FROM gallery
      ORDER BY created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
};

/* =========================
   ADD GALLERY ITEM (ADMIN)
========================= */
export const addGallery = async (req, res) => {
  const { title } = req.body;

  const imageUrl = req.file
    ? `/uploads/gallery/${req.file.filename}`
    : null;

  if (!title || !imageUrl) {
    return res.status(400).json({ error: "Title and image are required" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO gallery (title, image_url)
      VALUES ($1, $2)
      RETURNING *
      `,
      [title, imageUrl]
    );

    res.status(201).json({
      success: true,
      gallery: result.rows[0]
    });
  } catch (error) {
    console.error("Add Gallery Error:", error);
    res.status(500).json({ error: "Failed to add gallery item" });
  }
};

/* =========================
   DELETE GALLERY ITEM (ADMIN)
========================= */
export const deleteGallery = async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Get image path from DB
    const result = await pool.query(
      "SELECT image_url FROM gallery WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    const imageUrl = result.rows[0].image_url;

    // 2️⃣ Delete image file from disk
    if (imageUrl) {
      const imagePath = path.join(process.cwd(), imageUrl);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Image delete warning:", err.message);
          // do NOT stop execution (DB must still delete)
        }
      });
    }

    // 3️⃣ Delete DB row
    await pool.query(
      "DELETE FROM gallery WHERE id = $1",
      [id]
    );

    res.json({ success: true });

  } catch (error) {
    console.error("Delete Gallery Error:", error);
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
};
