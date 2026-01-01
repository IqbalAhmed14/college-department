const API_URL = "https://college-department-backend.onrender.com/api/admin/messages";


const container = document.getElementById("messagesContainer");

async function loadMessages() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    const messages = await response.json();
    container.innerHTML = "";

    if (messages.length === 0) {
      container.innerHTML = `
        <div class="card">No messages found.</div>
      `;
      return;
    }

    messages.forEach(msg => {
      const card = document.createElement("div");
      card.className = "message-card";

      card.innerHTML = `
        <div class="message-header">
          <div>
            <div class="message-name">${msg.name}</div>
            <div class="message-email">${msg.email}</div>
          </div>
          <div class="message-date">
            ${new Date(msg.created_at).toLocaleString()}
          </div>
        </div>

        <div class="message-body">
          ${msg.message}
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Messages error:", error);
    container.innerHTML = `
      <div class="card">Error loading messages</div>
    `;
  }
}

loadMessages();
