/* modal.js */
/* Reusable Modal Logic */

document.addEventListener("DOMContentLoaded", () => {
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalCloseBtn = document.querySelector(".modal-close");

  if (!modalOverlay) return;

  // Open modal
  window.openModal = () => {
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  // Close modal
  window.closeModal = () => {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  };

  // Close when clicking close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  // Close when clicking outside modal
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
});
