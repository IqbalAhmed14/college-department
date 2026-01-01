// gallery-admin.js
const API_URL = "http://localhost:5000/api/gallery";

const token = localStorage.getItem("adminToken");

const form = document.getElementById("galleryForm");
const status = document.getElementById("galleryStatus");

// 🔹 Container to show uploaded images (auto-create if not present)
let listContainer = document.getElementById("galleryList");
if (!listContainer) {
  listContainer = document.createElement("div");
  listContainer.id = "galleryList";
  listContainer.style.marginTop = "32px";
  form.parentElement.appendChild(listContainer);
}

/* =========================
   LOAD GALLERY ITEMS
========================= */
async function loadGallery() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    listContainer.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      listContainer.innerHTML = "<p>No gallery images uploaded yet.</p>";
      return;
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.marginBottom = "16px";

      card.innerHTML = `
        <img 
          src="http://localhost:5000${item.image_url}"
          style="width:100%;max-height:200px;object-fit:cover;border-radius:8px"
        />
        <h4 style="margin-top:12px">${item.title}</h4>
        <button 
          class="btn btn-danger"
          data-id="${item.id}"
          style="margin-top:8px"
        >
          Delete
        </button>
      `;

      card.querySelector("button").onclick = () =>
        deleteGallery(item.id);

      listContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Load gallery error:", error);
  }
}

/* =========================
   DELETE GALLERY ITEM
========================= */
async function deleteGallery(id) {
  if (!confirm("Are you sure you want to delete this image?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert("Failed to delete image");
      return;
    }

    loadGallery(); // 🔥 refresh list
  } catch (error) {
    console.error("Delete gallery error:", error);
    alert("Server error");
  }
}

/* =========================
   UPLOAD IMAGE
========================= */
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "";
    status.style.color = "";

    const title = document.getElementById("title").value.trim();
    const imageInput = document.getElementById("image");

    if (!title || !imageInput.files.length) {
      status.textContent = "All fields are required";
      status.style.color = "red";
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageInput.files[0]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        status.textContent = data.error || "Upload failed";
        status.style.color = "red";
        return;
      }

      status.textContent = "✅ Image uploaded successfully";
      status.style.color = "green";
      form.reset();

      loadGallery(); // 🔥 refresh list

    } catch (error) {
      console.error("Gallery upload error:", error);
      status.textContent = "❌ Server error";
      status.style.color = "red";
    }
  });
}

/* =========================
   INIT
========================= */
loadGallery();
