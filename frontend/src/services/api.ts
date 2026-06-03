const API_URL = "http://localhost:3000";

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
    return response.json();
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error posting to ${endpoint}`);
    return response.json();
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error updating ${endpoint}`);
    return response.json();
  },

  delete: async (endpoint: string): Promise<void> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Error deleting ${endpoint}`);
  }
};
