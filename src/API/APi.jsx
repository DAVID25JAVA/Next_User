import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error?.message || "Something went wrong");
    return Promise.reject(error);
  }
);

export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const deleteUse = (id) => api.delete(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export default api;
