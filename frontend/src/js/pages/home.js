/* home.js */
/* Home Page Logic + Backend Integration */

const API_BASE_URL = "https://college-department-backend.onrender.com/api";

export function initHome() {
  console.log("Home page initialized");

  loadDepartmentData();   // 🔥 NEW (backend)
  highlightStats();       // ✅ EXISTING (keep UI)
}

/* ================================
   Backend Integration
================================ */

async function loadDepartmentData() {
  try {
    const response = await fetch(`${API_BASE_URL}/department`);
    const data = await response.json();

    // If DB empty, keep static content
    if (data.message) {
      console.warn("Department data not found yet");
      return;
    }

    // Navbar
    const navDept = document.getElementById("navDepartment");
    if (navDept) navDept.textContent = data.department_name;

    // Hero
    const deptName = document.getElementById("departmentName");
    if (deptName) deptName.textContent = data.department_name;

    const deptTagline = document.getElementById("departmentTagline");
    if (deptTagline && data.vision)
      deptTagline.textContent = data.vision;

    // Footer
    const footerDept = document.getElementById("footerDepartment");
    if (footerDept) footerDept.textContent = data.department_name;

  } catch (error) {
    console.error("Failed to load department data:", error);
  }
}

/* ================================
   EXISTING UI LOGIC (UNCHANGED)
================================ */

/**
 * Simple stat animation on load
 */
function highlightStats() {
  const stats = document.querySelectorAll(".stat-box h2");

  if (!stats.length) return;

  stats.forEach(stat => {
    const finalValue = parseInt(stat.textContent);
    let current = 0;

    const increment = Math.ceil(finalValue / 40);

    const counter = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        stat.textContent = finalValue + "+";
        clearInterval(counter);
      } else {
        stat.textContent = current;
      }
    }, 30);
  });
}
