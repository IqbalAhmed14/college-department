const API_URL = "https://college-department-backend.onrender.com/api/admin/login";


document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("loginStatus");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      status.textContent = data.error || "Login failed";
      status.style.color = "red";
      return;
    }

    localStorage.setItem("adminToken", data.token);
    window.location.href = "admin-dashboard.html";

  } catch (err) {
    status.textContent = "Server error";
    status.style.color = "red";
  }
});
