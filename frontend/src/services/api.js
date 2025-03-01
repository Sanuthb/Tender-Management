import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Authentication API Calls
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Fetch Tenders
export const getTenders = async () => {
  try {
    const response = await API.get("/tenders");
    return response.data; 
  } catch (error) {
    console.error("Error fetching tenders:", error);
    throw error;
  }
};




