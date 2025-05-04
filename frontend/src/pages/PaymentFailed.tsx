// src/pages/PaymentFailed.tsx
import { motion } from 'framer-motion';
import { FiXCircle, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const isCanceled = window.location.search.includes('canceled=true');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Failure Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
          >
            {isCanceled ? (
              <FiAlertTriangle className="text-5xl text-yellow-500" />
            ) : (
              <FiXCircle className="text-5xl text-red-500" />
            )}
          </motion.div>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            {isCanceled ? 'Payment Canceled' : 'Payment Failed'}
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {isCanceled
              ? 'You canceled the payment process. Your order was not completed.'
              : 'We couldn\'t process your payment. Please try again.'}
          </motion.p>
        </div>

        {/* Error Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto"
        >
          <div className={`p-6 text-white ${
            isCanceled 
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
              : 'bg-gradient-to-r from-red-500 to-pink-600'
          }`}>
            <h2 className="text-2xl font-bold">
              {isCanceled ? 'Payment Canceled' : 'Payment Declined'}
            </h2>
            <p className="opacity-90 mt-2">
              {isCanceled
                ? 'You interrupted the payment process'
                : 'The transaction could not be completed'}
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Main Message */}
              <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-full ${
                    isCanceled ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {isCanceled ? <FiAlertTriangle className="text-xl" /> : <FiXCircle className="text-xl" />}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {isCanceled ? 'Payment was canceled' : 'Payment was unsuccessful'}
                  </h3>
                  <p className="text-gray-600">
                    {isCanceled
                      ? 'You chose to cancel the payment before it was completed. No amount was deducted from your account.'
                      : 'The payment processor declined your transaction. Please check your payment details and try again.'}
                  </p>
                </div>
              </div>

              {/* Possible Reasons */}
              {!isCanceled && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Possible reasons:</h4>
                  <ul className="space-y-3 pl-5 list-disc text-gray-600">
                    <motion.li
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      Insufficient funds in your account
                    </motion.li>
                    <motion.li
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Incorrect card details entered
                    </motion.li>
                    <motion.li
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      Bank declined the transaction
                    </motion.li>
                    <motion.li
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      Technical issue with payment processor
                    </motion.li>
                  </ul>
                </div>
              )}

              {/* Next Steps */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">What you can do:</h4>
                <ul className="space-y-3 pl-5 list-disc text-gray-600">
                  <motion.li
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    {isCanceled
                      ? 'Return to your cart to complete your purchase'
                      : 'Verify your payment information and try again'}
                  </motion.li>
                  <motion.li
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    Try using a different payment method
                  </motion.li>
                  <motion.li
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    Contact your bank if you suspect an issue
                  </motion.li>
                  <motion.li
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    Reach out to our support team for assistance
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all flex items-center justify-center"
            >
              <FiArrowLeft className="mr-2" />
              Back to Payment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/shop')}
              className={`px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                isCanceled
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                  : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
              }`}
            >
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 bg-white rounded-xl shadow-sm p-6 max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Need help?</h3>
          <div className="prose prose-indigo text-gray-600">
            <p>
              Our customer support team is available 24/7 to assist you with any payment issues.
            </p>
            <div className="mt-4 space-y-2">
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

export default PaymentFailed;