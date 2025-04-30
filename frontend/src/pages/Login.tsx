import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginUser } from '../services/auth/api';
import { LoginData } from '../types/auth/login';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../redux/hooks/hooks';
import { login } from '../redux/slices/auth.slice';
import { LoginResponse } from '../types/auth/auth';
import { useNavigate} from 'react-router-dom';

const Login: React.FC = () => {
  const [error] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const initialValues: LoginData = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const navigate = useNavigate();
  const handleSubmit = async (
        values: LoginData, 
        formikHelpers: {
            setSubmitting: (isSubmitting: boolean) => void;
            resetForm: () => void;
        }
    ) => {
        const { setSubmitting, resetForm } = formikHelpers;
        try {
            const response: LoginResponse = await loginUser(values);
            if(response.success){
                dispatch(login(response));
                toast.success(response.message);
                resetForm(); 
                if(response.user.role === 'admin')
                  navigate('/admin');
            }else{
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error(err.message);
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
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Login to TrendyNest</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
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
                {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </motion.button>
              </Form>
            )}
          </Formik>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-indigo-600 hover:underline">
              Register
            </a>
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;