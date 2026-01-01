/* contact.js */
/* Contact Form Integration */

const API_BASE_URL = "https://college-department-backend.onrender.com/api";


export function initContact() {
  console.log("Contact page initialized");

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending message...";
    status.style.color = "#555";

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      status.textContent = "Message sent successfully ✅";
      status.style.color = "green";

      form.reset();

    } catch (error) {
      console.error("Contact form error:", error);
      status.textContent = "Failed to send message ❌";
      status.style.color = "red";
    }
  });
}
