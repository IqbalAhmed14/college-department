/* resources.js */
/* Resources Page Logic + Backend Integration (FIXED) */

const API_BASE_URL = "http://localhost:5000/api";
const FILE_BASE_URL = "http://localhost:5000"; // 🔥 IMPORTANT FIX

export function initResources() {
  console.log("Resources page initialized");
  loadResources();
}

async function loadResources() {
  try {
    const response = await fetch(`${API_BASE_URL}/resources`);
    const resources = await response.json();

    const syllabusList = document.getElementById("syllabusList");
    const materialsList = document.getElementById("materialsList");
    const noticesList = document.getElementById("noticesList");

    // Safety check
    if (!Array.isArray(resources) || resources.length === 0) {
      syllabusList.innerHTML = "<p>No syllabus uploaded yet.</p>";
      materialsList.innerHTML = "<p>No study materials available.</p>";
      noticesList.innerHTML = "<p>No notices available.</p>";
      return;
    }

    // Clear previous content
    syllabusList.innerHTML = "";
    materialsList.innerHTML = "";
    noticesList.innerHTML = "";

    resources.forEach(item => {
      const card = document.createElement("div");
      card.className = "card resource-item";

      // ✅ FIX: Always open from backend (5000)
      const fileLink = item.file_url
        ? `${FILE_BASE_URL}${item.file_url}`
        : null;

      card.innerHTML = `
        <span>${item.title}</span>
        ${
          fileLink
            ? `<a href="${fileLink}" target="_blank">View</a>`
            : ""
        }
      `;

      if (item.resource_type === "syllabus") {
        syllabusList.appendChild(card);
      }

      if (item.resource_type === "material") {
        materialsList.appendChild(card);
      }

      if (item.resource_type === "notice") {
        noticesList.appendChild(card);
      }
    });

  } catch (error) {
    console.error("Failed to load resources:", error);
  }
}
