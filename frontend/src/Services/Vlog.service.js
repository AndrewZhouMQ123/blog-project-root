import http from "../http-common";

class VlogDataService {
  create(title, description, file = null) {
    const formData = new FormData();

    // Append the file if it is provided
    if (file) {
      console.log(file);
      formData.append("file", file);
    }

    // Append the vlog data
    formData.append('title', JSON.stringify({title: title})); // Append the title
    formData.append('description', JSON.stringify({description: description})); // Append the description
    console.log(formData);

    return http.post("/vlogs", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
  }

  getAll() {
    return http.get("/vlogs");
  }

  // get(id) {
  //   return http.get(`/vlogs/${id}`);
  // }

  // create(data) {
  //   return http.post("/vlogs", data);
  // }

  // update(id, data) {
  //   return http.put(`/vlogs/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/vlogs/${id}`);
  // }

  deleteAll() {
    return http.delete("/vlogs");
  }

  findByTitle(title) {
    return http.get(`/vlogsByTitle?title=${title}`);
  }
}

const vlogDataService = new VlogDataService();

export default vlogDataService;