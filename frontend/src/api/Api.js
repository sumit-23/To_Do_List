import axios from "axios";

const API_URL = "http://localhost:4000";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.log("Login Error>>> ", error);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.log("Signup Error>>>> ", error);
    throw error;
  }
};
