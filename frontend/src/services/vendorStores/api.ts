const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';

export const fetchAdminApprovedVendorStores = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor-stores/admin/approved`, {
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

export const fetchAdminPendingVendorStores = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor-stores/admin/pending`, {
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

export const fetchAdminRejectedVendorStores = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor-stores/admin/rejected`, {
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

export const changeStatus = async(vendorStoreId: string, token: string, status: string) => {
    try {
        const status = 'approved';
        
        const response = await axios.put(`${API_BASE_URL}/vendor-stores/${vendorStoreId}`, {
            vendorStore: {
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