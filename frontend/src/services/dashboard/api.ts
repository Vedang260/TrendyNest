const API_BASE_URL = 'http://localhost:8000/api';
import axios from 'axios';
import { useAppSelector} from '../../redux/hooks/hooks';

const { token } = useAppSelector((state) => state.auth);

export const fetchAdminDashboardData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
};
