// src/pages/OrderItems.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';
import { fetchOrderItems } from '../services/orders';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { useAppSelector } from '../redux/hooks/hooks';
import { OrderItem } from '../types/orders';

const OrderItems = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const token = useAppSelector((state) => state.auth?.token || '');
  
  useEffect(() => {
    const loadOrderItems = async () => {
      if (!orderId) {
        navigate('/orders');
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetchOrderItems(orderId, token);
        
        if (response.success) {
          setOrderItems(response.orderItems);
          setOrderDetails(response.orderDetails || null);
        } else {
          toast.error(response.message || 'Failed to load order items');
          navigate('/orders');
        }
      } catch (error) {
        toast.error('An error occurred while loading order items');
        navigate('/orders');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrderItems();
  }, [orderId, navigate]);

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/customer/orders')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Orders
          </motion.button>
          
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm px-4 py-3"
            >
              <p className="text-sm text-gray-500">Order ID: <span className="font-medium text-gray-800">{orderId?.substring(0, 8).toUpperCase()}</span></p>
              <p className="text-sm text-gray-500">Placed on: <span className="font-medium text-gray-800">
                {new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span></p>
            </motion.div>
          )}
        </div>

        {/* Order Summary Card */}
        {orderDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden mb-8"
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderDetails.status)}`}>
                      {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {orderItems.length} {orderItems.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">Total Amount</p>
                  <p className="text-3xl font-bold text-indigo-600">{formatPrice(orderDetails.totalAmount)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Items */}
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
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : orderItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20 bg-white rounded-xl shadow-sm"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <FiPackage className="text-4xl text-indigo-600" />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500 mb-6">This order doesn't contain any items</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6"
          >
            <AnimatePresence>
              {orderItems.map((item, index) => (
                <motion.div
                  key={item.orderItemsId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.mainImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                              {item.productName}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-indigo-600">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        
                        {/* Status */}
                        <div className="mt-4 flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Need help with your order?</h3>
          <div className="prose prose-indigo text-gray-600">
            <p className="mb-4">
              If you have any questions about your order or need assistance, our customer support team is here to help.
            </p>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="font-medium mr-2">Email:</span>
                support@trendynest.com
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Phone:</span>
                +1 (800) 123-4567
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default OrderItems;