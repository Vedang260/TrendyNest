import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { fetchAdminDashboardData } from '../services/dashboard/api';
import toast from 'react-hot-toast';
import { AdminDashboardData } from '../types/dashboard/adminDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAppSelector } from '../redux/hooks/hooks';

const Counter: React.FC<{ end: number; duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const token = useAppSelector((state) => state.auth?.token);

  useEffect(() => {
    const loadData = async () => {
      try {
        if(token){
          const response = await fetchAdminDashboardData(token);
          if(response.success){
            setData(response.dashboard);
            setError(null);
          }
        }
      } catch (err) {
        setError('Failed to load dashboard data');
      }
    };
    loadData();
  }, []);

  const metricCards = [
    { 
      title: 'Total Categories', 
      value: data?.totalCategories, 
      icon: <i className="fas fa-list text-indigo-500"></i>,
      trend: '+5 this month'
    },
    { 
      title: 'Total Subcategories', 
      value: data?.totalSubCategories, 
      icon: <i className="fas fa-list-ol text-pink-500"></i>,
      trend: '+12 this month'
    },
    { 
      title: 'Total Users', 
      value: data?.totalUsers, 
      icon: <i className="fas fa-user-shield text-purple-500"></i>,
      trend: 'Admin & Staff'
    },
    { 
      title: 'Total Customers', 
      value: data?.totalCustomers, 
      icon: <i className="fas fa-users text-green-500"></i>,
      trend: '+120 this week'
    },
    { 
      title: 'Total Vendors', 
      value: data?.totalVendors, 
      icon: <i className="fas fa-store text-blue-500"></i>,
      trend: 'Active sellers'
    },
    { 
      title: 'Total Vendor Stores', 
      value: data?.totalVendorStores, 
      icon: <i className="fas fa-store-alt text-teal-500"></i>,
      trend: 'All locations'
    },
    { 
      title: 'Pending Vendor Stores', 
      value: data?.totalPendingVendorStores, 
      icon: <i className="fas fa-hourglass-half text-yellow-500"></i>,
      trend: 'Awaiting approval'
    },
    { 
      title: 'Approved Vendor Stores', 
      value: data?.totalApprovedVendorStores, 
      icon: <i className="fas fa-check-circle text-green-600"></i>,
      trend: 'Live on store'
    },
    { 
      title: 'Rejected Vendor Stores', 
      value: data?.totalRejectedVendorStores, 
      icon: <i className="fas fa-times-circle text-red-500"></i>,
      trend: 'Removed from review'
    },
    { 
      title: 'Total Products', 
      value: data?.totalProducts, 
      icon: <i className="fas fa-box text-indigo-400"></i>,
      trend: '+50 this month'
    },
    { 
      title: 'Pending Products', 
      value: data?.totalPendingProducts, 
      icon: <i className="fas fa-hourglass-half text-yellow-600"></i>,
      trend: 'In review'
    },
    { 
      title: 'Approved Products', 
      value: data?.totalApprovedProducts, 
      icon: <i className="fas fa-check-circle text-green-700"></i>,
      trend: 'Available'
    },
    { 
      title: 'Rejected Products', 
      value: data?.totalRejectedProducts, 
      icon: <i className="fas fa-times-circle text-red-600"></i>,
      trend: 'Not approved'
    },
  ];

  return (
    <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar onCollapseChange={setIsSidebarCollapsed} />
          
          <motion.main
            initial={{ marginLeft: 256 }}
            animate={{ marginLeft: isSidebarCollapsed ? 0 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 p-8 bg-gradient-to-b from-gray-100 to-white min-h-[calc(100vh-64px)]"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl p-8 font-extrabold text-purple-600 mb-8 bg-white"
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
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-start space-x-4"
                >
                  <div className="text-3xl mt-1">{card.icon}</div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
                    <p className="text-2xl font-bold text-gray-900">
                      {data ? <Counter end={card.value || 0} duration={1.5} /> : '0'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{card.trend}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;