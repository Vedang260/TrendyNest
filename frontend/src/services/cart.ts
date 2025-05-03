const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';

export const addToCart = async(productId: string, token: string, quantity?: number) => {
    try {
        let newQuantity = 1;
        if(quantity){
            newQuantity = quantity > 1 ? quantity : 1;
        }
        const cartItem = {
            productId,
            quantity: newQuantity
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

export const fetchCartItems = async (token:string) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/cart-items`, 
        {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.message || 'Error in Fetching the cart-items');
    }
}

export const updateCartItem = async (cartItemId: string, quantity: number, token:string) => {
    try{
        const response = await axios.put(`${API_BASE_URL}/cart-items/${cartItemId}`, 
            {quantity},
        {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.message || 'Error in Fetching the cart-items');
    }
}

export const removeCartItem = async (cartItemId: string, token:string) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/cart-items/${cartItemId}`, 
        {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.message || 'Error in Fetching the cart-items');
    }
}