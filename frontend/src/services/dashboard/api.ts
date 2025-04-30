const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';
import { useAppSelector} from '../../redux/hooks/hooks';

export const fetchAdminDashboardData = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/admin`, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
};
