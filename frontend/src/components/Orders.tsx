// src/pages/Orders.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiChevronRight } from 'react-icons/fi';
import { fetchCustomerOrders } from '../services/orders';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { CustomerOrders } from '../types/orders';
import { useAppSelector } from '../redux/hooks/hooks';

const Orders = () => {
  const [orders, setOrders] = useState<CustomerOrders[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth?.token || '');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCustomerOrders(token);
        if (response.success) {
          setOrders(response.orders);
        } else {
          toast.error(response.message || 'Failed to load orders');
        }
      } catch (error) {
        toast.error('An error occurred while loading orders');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      case 'shipped':
        return <FiTruck className="text-blue-500" />;
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />;
      default:
        return <FiPackage className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressSteps = (status: string) => {
    const steps = [
      { name: 'Order Placed', status: 'complete' },
      { name: 'Processing', status: status === 'pending' ? 'current' : 'complete' },
      { name: 'Shipped', status: status === 'pending' ? 'upcoming' : status === 'shipped' ? 'current' : 'complete' },
      { name: 'Delivered', status: status === 'delivered' ? 'complete' : 'upcoming' },
    ];
    return steps;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">Your Orders</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track and manage all your recent purchases
          </p>
        </motion.div>

        {/* Orders List */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </motion.div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <FiPackage className="text-4xl text-indigo-600" />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Shop Now
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6"
          >
            <AnimatePresence>
              {orders.map((order, index) => (
                <motion.div
                  key={order.orderId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          Order #{order.orderId.substring(0, 8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <span className="text-lg font-bold text-indigo-600">
                          ₹{order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-6">
                      <div className="hidden sm:block">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-between">
                            {getProgressSteps(order.status).map((step, stepIdx) => (
                              <div key={step.name} className="flex flex-col items-center">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                  step.status === 'complete' ? 'bg-indigo-600' : 
                                  step.status === 'current' ? 'bg-white border-2 border-indigo-600' : 
                                  'bg-white border-2 border-gray-200'
                                }`}>
                                  {step.status === 'complete' ? (
                                    <FiCheckCircle className="h-5 w-5 text-white" />
                                  ) : step.status === 'current' ? (
                                    <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                                  ) : (
                                    <div className="h-3 w-3 rounded-full bg-gray-200"></div>
                                  )}
                                </div>
                                <span className={`mt-2 text-xs font-medium ${
                                  step.status === 'complete' ? 'text-indigo-600' : 
                                  step.status === 'current' ? 'text-indigo-600' : 
                                  'text-gray-500'
                                }`}>
                                  {step.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="sm:hidden text-sm text-gray-500">
                        Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigate(`/order-items/${order.orderId}`)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
                      >
                        View details
                        <FiChevronRight className="mt-0.5" />
                      </button>
                      <button
                        onClick={() => toast.success('Support team has been notified')}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                      >
                        Need help?
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.section>

      <Footer />
    </div>
  );
};

export default Orders;