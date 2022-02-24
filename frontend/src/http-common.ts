import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3006/api",
  headers: {
    "Content-type": "application/json"
  }
});

axiosInstance.interceptors.response.use(function (response) {
  return response.data;
})

export default axiosInstance;