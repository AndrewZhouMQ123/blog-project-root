import http from "../http-common";

class VlogDataService {
  // Create a new vlog with optional file
  async create(title, description, file = null) {
    const formData = new FormData();

    // Append the file if it is provided
    if (file) {
      console.log(file);
      formData.append("file", file);
    }

    // Append the vlog data
    formData.append('title', title); // Directly append title
    formData.append('description', description); // Directly append description
    console.log(formData);

    try {
      const response = await http.post("/vlogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error creating vlog:", error);
      throw error; // Rethrow to handle upstream
    }
  }

  // Get all vlogs
  async getAll() {
    try {
      const response = await http.get("/vlogs");
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching vlogs:", error);
      throw error; // Rethrow to handle upstream
    }
  }

  // Get a specific vlog by ID
  async get(id) {
    try {
      const response = await http.get(`/vlogs/${id}`);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching vlog:", error);
      throw error; // Rethrow to handle upstream
    }
  }

  // Update a specific vlog by ID
  async update(id, title, description, file = null) {
    const formData = new FormData();

    // Append the file if it is provided
    if (file) {
      console.log(file);
      formData.append("file", file);
    }

    // Append the vlog data
    formData.append('title', title);
    formData.append('description', description);
    
    try {
      const response = await http.put(`/vlogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error updating vlog:", error);
      throw error; // Rethrow to handle upstream
    }
  }

  // Delete a specific vlog by ID
  async delete(id) {
    try {
      const response = await http.delete(`/vlogs/${id}`);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error deleting vlog:", error);
      throw error; // Rethrow to handle upstream
    }
  }

  // Delete all vlogs
  async deleteAll() {
    try {
      const response = await http.delete("/vlogs");
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error deleting all vlogs:", error);
      throw error; // Rethrow to handle upstream
    }
  }

  // Find vlogs by title
  async findByTitle(title) {
    try {
      const response = await http.get(`/vlogsByTitle?title=${title}`);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error finding vlogs by title:", error);
      throw error; // Rethrow to handle upstream
    }
  }
}

const vlogDataService = new VlogDataService();

export default vlogDataService;
