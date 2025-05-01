const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';

export const addToCart = async(productId: string, token: string) => {
    try {
        const cartItem = {
            productId,
            quantity: 1
        }
        const response = await axios.post(`${API_BASE_URL}/cart-items/add`, 
            {cartItem},
        {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error in Fetching the categories');
    }
};