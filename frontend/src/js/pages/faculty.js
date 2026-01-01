const API_BASE_URL = "http://localhost:5000/api";
const BACKEND_BASE_URL = "http://localhost:5000";

export function initFaculty() {
  loadFaculty();
}

async function loadFaculty() {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty`);
    const facultyList = await response.json();

    const container = document.querySelector(".faculty-grid");
    if (!container) return;

    if (!Array.isArray(facultyList) || facultyList.length === 0) {
      container.innerHTML = "<p>No faculty data available.</p>";
      return;
    }

    container.innerHTML = "";

    facultyList.forEach(faculty => {
      const imageSrc = faculty.image_url
        ? `${BACKEND_BASE_URL}${faculty.image_url}`
        : "../images/default-avatar.png";

      const card = document.createElement("div");
      card.className = "faculty-card card fade-in";

      card.innerHTML = `
        <img src="${imageSrc}" alt="${faculty.name}" />
        <h3>${faculty.name}</h3>
        <p>${faculty.designation || ""}</p>
        <span>${faculty.qualification || ""}</span>
        <a href="faculty-profile.html?id=${faculty.id}" class="btn btn-outline">
          View Profile
        </a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Faculty load error:", err);
  }
}
