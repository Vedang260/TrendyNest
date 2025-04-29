const API_BASE_URL = 'http://localhost:8000/api';
import { RegisterData } from "../../types/auth/register";
import { LoginData } from "../../types/auth/login";
import axios from 'axios';

export const registerUser = async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
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