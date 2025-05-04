// src/pages/PaymentSuccess.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDollarSign, FiCreditCard, FiCalendar, FiUser, FiShield } from 'react-icons/fi';
import { fetchPaymentDetails } from '../services/payment';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PaymentDetails } from '../types/payment';
import { useAppSelector } from '../redux/hooks/hooks';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector((state) => state.auth?.token || '');

  // Extract paymentId from URL query params
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get('paymentId');

  useEffect(() => {
    const fetchPayment = async () => {
      if (!paymentId) {
        toast.error('No payment ID found in URL');
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetchPaymentDetails(paymentId, token);
        
        if (response.success) {
          setPayment(response.payment);
        } else {
          toast.error(response.message || 'Failed to fetch payment details');
          navigate('/');
        }
      } catch (error) {
        toast.error('An error occurred while fetching payment details');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">No payment details found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Success Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <FiCheckCircle className="text-5xl text-green-500" />
          </motion.div>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Thank you for your purchase. Your transaction has been completed successfully.
          </motion.p>
        </div>

        {/* Payment Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Order Confirmation</h2>
            <p className="opacity-90">Payment ID: {payment.paymentId}</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Amount */}
              <div className="flex items-start space-x-4 bg-indigo-50 p-4 rounded-lg">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FiDollarSign className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Amount Paid</h3>
                  <p className="text-2xl font-bold text-indigo-600">₹ {payment.amount}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiCreditCard className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Payment Method</h3>
                  <p className="text-xl font-semibold capitalize text-purple-600">
                    {payment.paymentMethod === 'stripe' ? 'Credit/Debit Card' : payment.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="flex items-start space-x-4 bg-green-50 p-4 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full">
                  <FiShield className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Transaction ID</h3>
                  <p className="text-sm font-mono text-green-600 break-all">{payment.transactionId}</p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex items-start space-x-4 bg-blue-50 p-4 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full">
                  <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Status</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize">
                    {payment.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800">Payment initiated</p>
                    <p className="text-sm text-gray-500">{formatDate(payment.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800">Payment completed</p>
                    <p className="text-sm text-gray-500">{formatDate(payment.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <FiUser className="text-gray-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Customer ID</h3>
                  <p className="text-sm font-mono text-gray-600">{payment.customerId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              View Your Orders
            </button>
            <button
              onClick={() => navigate('/customer/shop')}
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-xl shadow-sm p-6 max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">What happens next?</h3>
          <div className="prose prose-indigo text-gray-600">
            <ul className="space-y-2">
              <li>Your order is being processed and will be shipped soon</li>
              <li>You'll receive a confirmation email with all the details</li>
              <li>Track your order from your account dashboard</li>
              <li>For any questions, contact our support team</li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;