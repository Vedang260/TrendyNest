const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';

export const fetchCustomerOrders = async (token:string) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/orders/customer/`, 
        {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.message || 'Error in Fetching the orders');
    }
}

export const fetchOrderItems = async (orderId: string, token:string) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/order-items/${orderId}`, 
        {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.message || 'Error in Fetching the order-items');
    }
}