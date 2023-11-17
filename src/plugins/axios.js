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

export default instance;
