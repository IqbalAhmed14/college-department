// ===============================
// Resource Admin JS (FINAL – FIXED VIEW ISSUE)
// ===============================

const API = "https://college-department-backend.onrender.com/api/resources";
const BACKEND = "https://college-department-backend.onrender.com";

const form = document.getElementById("resourceForm");
const list = document.getElementById("resourceList");

// -------------------------------
// Handle Resource Upload
// -------------------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(form);

    console.log("Uploading resource...");

    const response = await fetch(API, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload failed:", errorText);
      alert("Upload failed. Please check backend logs.");
      return;
    }

    console.log("Upload successful");
    form.reset();
    await loadResources();

  } catch (error) {
    console.error("Upload error:", error);
    alert("Something went wrong while uploading the resource.");
  }
});

// -------------------------------
// Load All Resources
// -------------------------------
async function loadResources() {
  try {
    const response = await fetch(API);

    if (!response.ok) {
      console.error("Failed to fetch resources");
      return;
    }

    const resources = await response.json();
    list.innerHTML = "";

    if (resources.length === 0) {
      list.innerHTML = "<li>No resources uploaded yet.</li>";
      return;
    }

    resources.forEach(resource => {
      const li = document.createElement("li");

      // ✅ SAFELY ENCODE FILE URL (THIS FIXES VIEW)
      const fileUrl = encodeURI(BACKEND + resource.file_url);

      li.innerHTML = `
        <strong>${resource.title}</strong>
        (${resource.resource_type})
        <a href="${fileUrl}" target="_blank">View</a>
        <button onclick="deleteResource(${resource.id})">Delete</button>
      `;

      list.appendChild(li);
    });

  } catch (error) {
    console.error("Load resources failed:", error);
  }
}

// -------------------------------
// Delete Resource
// -------------------------------
async function deleteResource(id) {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      console.error("Failed to delete resource");
      alert("Delete failed. Check backend.");
      return;
    }

    console.log("Resource deleted:", id);
    await loadResources();

  } catch (error) {
    console.error("Delete error:", error);
  }
}

// -------------------------------
// Initial Load
// -------------------------------
loadResources();
