const API_URL = "http://localhost:5000/api/faculty";

const token = localStorage.getItem("adminToken");

/* =========================
   ADD FACULTY (WITH IMAGE)
========================= */
const addForm = document.getElementById("addFacultyForm");

if (addForm) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("facultyStatus");

    const formData = new FormData();
    formData.append("name", document.getElementById("fullName").value.trim());
    formData.append("designation", document.getElementById("designation").value.trim());
    formData.append("qualification", document.getElementById("qualification").value.trim());
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("bio", document.getElementById("bio").value.trim());

    const imageInput = document.getElementById("profileImage");
    if (imageInput && imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    }

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
        status.textContent = data.error || "Failed to add faculty";
        status.style.color = "red";
        return;
      }

      status.textContent = "✅ Faculty added successfully";
      status.style.color = "green";
      addForm.reset();

    } catch (err) {
      console.error(err);
      status.textContent = "❌ Server error";
      status.style.color = "red";
    }
  });
}

/* =========================
   LIST FACULTY
========================= */
const table = document.getElementById("facultyTable");

async function loadFaculty() {
  if (!table) return;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    table.innerHTML = "";

    data.forEach(f => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${f.name}</td>
        <td>${f.designation}</td>
        <td>${f.email}</td>
        <td>
          <button onclick="editFaculty(${f.id})">Edit</button>
          <button onclick="deleteFaculty(${f.id})">Delete</button>
        </td>
      `;

      table.appendChild(row);
    });
  } catch (err) {
    console.error("Load Faculty Error:", err);
  }
}

/* =========================
   DELETE FACULTY
========================= */
window.deleteFaculty = async (id) => {
  if (!confirm("Are you sure you want to delete this faculty?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    loadFaculty();
  } catch (err) {
    console.error(err);
  }
};

/* =========================
   EDIT FACULTY (WITH IMAGE)
========================= */
window.editFaculty = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const faculty = await res.json();

    const name = prompt("Name:", faculty.name);
    const designation = prompt("Designation:", faculty.designation);
    const qualification = prompt("Qualification:", faculty.qualification);
    const email = prompt("Email:", faculty.email);
    const bio = prompt("Bio:", faculty.bio);

    if (!name || !designation || !qualification || !email || !bio) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("qualification", qualification);
    formData.append("email", email);
    formData.append("bio", bio);

    // Optional image update
    const image = prompt("Upload new image? Leave blank to keep old");
    if (image) {
      alert("To update image, please use Add Faculty form");
    }

    const updateRes = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!updateRes.ok) {
      alert("Update failed");
      return;
    }

    loadFaculty();
  } catch (err) {
    console.error(err);
  }
};

loadFaculty();
