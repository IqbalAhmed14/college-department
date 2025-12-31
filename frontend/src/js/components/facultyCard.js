/* facultyCard.js */
/* Handles faculty card interactions (static now, dynamic later) */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".faculty-card");

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      // Prevent button double navigation
      const link = card.querySelector("a[href]");
      if (!link) return;

      // If user clicked the button, let default behavior happen
      if (e.target.tagName.toLowerCase() === "a") return;

      // Otherwise, navigate to profile page
      window.location.href = link.getAttribute("href");
    });
  });
});
