import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:1337/api" });

export const registerUser = (data) => API.post("/auth/local/register", data);
export const loginUser = (data) => API.post("/auth/local", data);

export const saveResume = (data, token) =>
  API.post("/user-resumes", { data }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getResumes = (token) =>
  API.get("/user-resumes", {
    headers: { Authorization: `Bearer ${token}` }
  });