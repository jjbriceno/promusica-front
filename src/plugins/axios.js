import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 2000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withXSRFToken: true,
  withCredentials: true,
});

// instance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response && error.response.status === 419) {
//         window.location.reload();
//       }
//       return Promise.reject(error);
//     }
//   );

export default instance;
