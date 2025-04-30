import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoutes';

// import ProtectedRoute from './components/common/ProtectedRoute'
 const App = lazy(() => import('./App'));
 const Home = lazy(() => import('./pages/Home'));
 const Register = lazy(() => import('./pages/Register'));
 const Login = lazy(() => import('./pages/Login'));
 const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

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
          // Add more admin routes here...
        ],
      },
    ],
  },
]);
