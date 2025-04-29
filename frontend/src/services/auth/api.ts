const API_BASE_URL = 'http://localhost:5000/api';
import { RegisterData } from "../../types/auth/register";
import { LoginData } from "../../types/auth/login";

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};