/* gallery.js */
/* Public Gallery Page – Dynamic Backend Integration */

const API_BASE_URL = "http://localhost:5000/api";
const BACKEND_BASE_URL = "http://localhost:5000";

export function initGallery() {
  loadGallery();
}

async function loadGallery() {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);

    if (!response.ok) {
      throw new Error("Failed to fetch gallery data");
    }

    const images = await response.json();

    // Clear static or previous content
    galleryGrid.innerHTML = "";

    // Empty state
    if (!Array.isArray(images) || images.length === 0) {
      galleryGrid.innerHTML = `
        <p style="text-align:center; opacity:0.7;">
          No gallery images available.
        </p>
      `;
      return;
    }

    images.forEach(item => {
      if (!item.image_url) return; // safety guard

      const imageUrl = `${BACKEND_BASE_URL}${item.image_url}`;

      const figure = document.createElement("figure");
      figure.className = "card fade-in";

      figure.innerHTML = `
        <img 
          src="${imageUrl}" 
          alt="${item.title || "Gallery Image"}"
          loading="lazy"
        />
        <figcaption>${item.title || ""}</figcaption>
      `;

      galleryGrid.appendChild(figure);
    });

  } catch (error) {
    console.error("Gallery load error:", error);

    galleryGrid.innerHTML = `
      <p style="text-align:center; color:red;">
        Failed to load gallery images.
      </p>
    `;
  }
}
