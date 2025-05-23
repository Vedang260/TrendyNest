import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoutes';
import PendingProducts from './components/admin/products/PendingProducts';
import ApprovedProducts from './components/admin/products/ApprovedProducts';
import RejectedProducts from './components/admin/products/RejectedProducts';
import Shop from './pages/Shop';
import ProductPage from './pages/Product';
import PaymentSuccess from './pages/Payment';
import PaymentFailed from './pages/PaymentFailed';
import Orders from './components/Orders';
import OrderItems from './components/OrderItems';
import ChatButton from './components/ChatButton';
import OrdersDashboard from './components/admin/orders/OrdersDashboard';

// import ProtectedRoute from './components/common/ProtectedRoute'
 const App = lazy(() => import('./App'));
 const Home = lazy(() => import('./pages/Home'));
 const Register = lazy(() => import('./pages/Register'));
 const Login = lazy(() => import('./pages/Login'));
 const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
 const AdminProductsDashboard = lazy(() => import('./components/admin/products/ProductsDashboard'));

 export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // This should contain <Outlet />
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      // 👇 Protected Routes
      // Admin-only routes
      {
        element: <ProtectedRoute roles={['admin']} />,
        children: [
          { path: "admin", element: <AdminDashboard /> },
          { path: 'admin/orders/dashboard', element: <OrdersDashboard />},
          { path: 'admin/products/pending', element: <PendingProducts />},
          { path: 'admin/products/approved', element: <ApprovedProducts />},
          { path: 'admin/products/rejected', element: <RejectedProducts />}
          // Add more admin routes here...
        ],
      },
      {
        path: 'customer',
        element: <ProtectedRoute roles={['customer']} />,
        children: [
          { path: 'orders', element: <Orders /> },
          { path: 'order-items/:orderId', element: <OrderItems /> },
          { path: 'payment-success', element: <PaymentSuccess /> },
          { path: 'product/:productId', element: <ProductPage /> },
          { path: 'payment-failed', element: <PaymentFailed /> },
          { path: 'shop', element: <Shop /> },
          {element: <ChatButton />}
        ]
      }      
    ],
  },
]);
