// Mock auth service - in a real app this would connect to a backend
import axios from 'axios';
import { User } from '../types/user';

const API_URL = 'http://localhost:5000/api/auth';

interface AuthResponse {
  token: string;
  user: User;
}

// This is a mock service for demonstration
// In a real app, you would make API calls to your backend
export const AuthService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },
  
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { username, email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  },
  
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    try {
      const response = await axios.put(`${API_URL}/profile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Profile update failed');
      }
      throw error;
    }
  }
};