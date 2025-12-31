// auth-guard.js
const token = localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "admin-login.html";
}

try {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const now = Date.now() / 1000;

  if (payload.exp < now) {
    localStorage.removeItem("adminToken");
    window.location.href = "admin-login.html";
  }
} catch {
  localStorage.removeItem("adminToken");
  window.location.href = "admin-login.html";
}
