import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiMail, FiLock, FiTag } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { registerUser } from '../services/auth/api';
import { RegisterData } from '../types/auth/register';

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const initialValues: RegisterData = {
    username: '',
    email: '',
    password: '',
    role: 'customer',
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, 'Username must be at least 3 characters').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    role: Yup.string().oneOf(['Vendor', 'Customer'], 'Invalid role').required('Required'),
  });

  const handleSubmit = async (values: RegisterData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      await registerUser(values);
      setError(null);
      // Redirect or handle success (e.g., navigate to login)
      console.log('Registration successful');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl"
        >
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Join TrendyNest</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <FiUser className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                      placeholder="Enter your username"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <FiMail className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <FiLock className="absolute top-3 left-3 text-gray-400 text-lg" />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <div className="mt-2 flex space-x-4">
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="role"
                        value="Customer"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="ml-2 text-gray-700">Customer</span>
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="role"
                        value="Vendor"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="ml-2 text-gray-700">Vendor</span>
                    </label>
                  </div>
                  <ErrorMessage name="role" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </motion.button>
              </Form>
            )}
          </Formik>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;