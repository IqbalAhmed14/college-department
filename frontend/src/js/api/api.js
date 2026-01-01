/* api.js */
/* Central API Helper */

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Generic GET request
 */
export async function apiGet(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("GET Error:", error);
    return null;
  }
}

/**
 * Generic POST request
 */
export async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("POST Error:", error);
    return null;
  }
}
