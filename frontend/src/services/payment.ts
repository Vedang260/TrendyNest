const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';
import { CartItem } from '../types/cart';

export const createCheckoutSession = async(cartItems: CartItem[], totalPrice: number, token: string) => {
    try {
        const response: any = await axios.post(`${API_BASE_URL}/payments/checkout`, 
        {
            cartItems,
            totalPrice
        },
        {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        console.log("", response);
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error in Fetching the categories');
    }
};