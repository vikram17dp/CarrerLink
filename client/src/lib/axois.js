import axios  from "axios";

 const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/api/v1",
    withCredentials:true
})
axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token'); // or wherever you're storing the token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  export {axiosInstance}