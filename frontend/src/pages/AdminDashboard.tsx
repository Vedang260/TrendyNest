import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiGrid, FiList, FiUsers, FiUserX, FiUser, FiShoppingBag, FiBox, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import AdminSidebar from '../components/AdminSidebar';
import { fetchAdminDashboardData } from '../services/dashboard/api';
import toast from 'react-hot-toast';
import { AdminDashboardData } from '../types/dashboard/adminDashboard';

const Counter: React.FC<{ end: number; duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60 FPS
    const animate = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        return;
      }
      setCount(Math.floor(start));
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
};

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchAdminDashboardData();
        if(response.success){
            setData(response.dashboard);
            setError(null);
            toast.success(response.message);
        }
      } catch (err) {
        setError('Failed to load dashboard data');
      }
    };
    loadData();
  }, []);

  const metricCards = [
    { title: 'Total Categories', value: data?.totalCategories, icon: <FiGrid />, color: 'bg-indigo-600' },
    { title: 'Total Subcategories', value: data?.totalSubCategories, icon: <FiList />, color: 'bg-pink-500' },
    { title: 'Total Users', value: data?.totalUsers, icon: <FiUsers />, color: 'bg-purple-600' },
    { title: 'Total Customers', value: data?.totalCustomers, icon: <FiUser />, color: 'bg-green-500' },
    { title: 'Total Vendors', value: data?.totalVendors, icon: <FiShoppingBag />, color: 'bg-blue-500' },
    { title: 'Total Vendor Stores', value: data?.totalVendorStores, icon: <FiShoppingBag />, color: 'bg-teal-500' },
    { title: 'Pending Vendor Stores', value: data?.totalPendingVendorStores, icon: <FiClock />, color: 'bg-yellow-500' },
    { title: 'Approved Vendor Stores', value: data?.totalApprovedVendorStores, icon: <FiCheckCircle />, color: 'bg-green-600' },
    { title: 'Rejected Vendor Stores', value: data?.totalRejectedVendorStores, icon: <FiXCircle />, color: 'bg-red-500' },
    { title: 'Total Products', value: data?.totalProducts, icon: <FiBox />, color: 'bg-indigo-500' },
    { title: 'Pending Products', value: data?.totalPendingProducts, icon: <FiClock />, color: 'bg-yellow-600' },
    { title: 'Approved Products', value: data?.totalApprovedProducts, icon: <FiCheckCircle />, color: 'bg-green-700' },
    { title: 'Rejected Products', value: data?.totalRejectedProducts, icon: <FiXCircle />, color: 'bg-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white font-sans flex">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-800 mb-8"
        >
          Admin Dashboard
        </motion.h1>
        {error && <div className="text-red-600 text-center mb-6">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              className={`bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg ${card.color} text-white flex items-center space-x-4`}
            >
              <div className="text-3xl">{card.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-2xl font-bold">
                  {data ? <Counter end={card.value || 0} duration={2} /> : '0'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;