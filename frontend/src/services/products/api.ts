const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';

export const fetchAdminApprovedProducts = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/admin/approved`, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error in Fetching the approved products');
    }
};

export const fetchAdminPendingProducts = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/admin/pending`, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error in Fetching the pending products');
    }
};

export const fetchAdminRejectedProducts = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/admin/rejected`, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error in Fetching the rejected products');
    }
};