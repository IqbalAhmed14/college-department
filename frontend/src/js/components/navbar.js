/* navbar.js */
/* Sticky Navbar Scroll Effect */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
    } else {
      navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
    }
  });
});
