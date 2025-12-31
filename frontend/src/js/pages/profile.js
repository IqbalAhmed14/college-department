const API_BASE_URL = "http://localhost:5000/api";
const BACKEND_BASE_URL = "http://localhost:5000";

export function initProfile() {
  const params = new URLSearchParams(window.location.search);
  const facultyId = params.get("id");

  if (!facultyId) {
    document.body.innerHTML = `
      <h2 style="text-align:center;margin-top:50px">
        Invalid profile link.<br>
        Please open from Faculty page.
      </h2>
    `;
    return;
  }

  loadProfile(facultyId);
}

async function loadProfile(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`);
    if (!response.ok) throw new Error();

    const data = await response.json();

    document.getElementById("profileName").textContent = data.name;
    document.getElementById("profileDesignation").textContent =
      data.designation || "";

    document.getElementById("profileQualification").textContent =
      data.qualification || "";

    document.getElementById("profileBio").textContent =
      data.bio || "Not available";

    document.getElementById("profileEmail").textContent =
      data.email || "N/A";

    // ✅ CORRECT FIELD NAME (THIS WAS THE BUG)
    const profileImg = document.getElementById("profileImage");
    profileImg.src = data.image_url
      ? `${BACKEND_BASE_URL}${data.image_url}`
      : "../images/default-avatar.png";

  } catch (error) {
    console.error("Profile load error:", error);
    alert("Faculty not found");
  }
}
