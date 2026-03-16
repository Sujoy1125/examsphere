import axios from "axios";

const API = axios.create({
  baseURL: "https://examsphere-backend.onrender.com/api",
});

API.interceptors.request.use((config) => {
  // Use adminToken for admin routes, token for student routes
  const isAdmin = config.url?.startsWith("/admin");
  const token = isAdmin
    ? localStorage.getItem("adminToken") || localStorage.getItem("token")
    : localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://examsphere-backend.onrender.com/api",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;
