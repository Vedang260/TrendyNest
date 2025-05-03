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

export const approveProduct = async(productId: string, token: string) => {
    try {
        const status = 'approved';
        
        const response = await axios.put(`${API_BASE_URL}/products/${productId}`, {
            product: {
                status: status
            }
        }, {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error in approving the product');
    }
};

export const rejectProduct = async(productId: string, token: string) => {
    try {
        const status = 'rejected';
        
        const response = await axios.put(`${API_BASE_URL}/products/${productId}`, {
            product: {
                status: status
            }
        }, {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        return response.data;
    } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error in rejecting the product');
    }
};

export const fetchProductsForCustomers = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/customers`, {
      headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
  throw new Error(error.response?.data?.message || 'Error in fetching the products for Customers');
  }
};

export const fetchProductDetails = async(productId: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
      headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
  throw new Error(error.response?.data?.message || 'Error in fetching the products for Customers');
  }
};