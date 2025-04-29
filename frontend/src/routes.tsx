import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
// import ProtectedRoute from './components/common/ProtectedRoute'

 const Home = lazy(() => import('./pages/Home'))
// const Shop = lazy(() => import('./pages/Shop'))
// const ProductDetails = lazy(() => import('./pages/ProductDetails'))
// const Cart = lazy(() => import('./pages/Cart'))
// const Checkout = lazy(() => import('./pages/Checkout'))
// const Login = lazy(() => import('./pages/Auth/Login'))
// const Register = lazy(() => import('./pages/Auth/Register'))
// const Dashboard = lazy(() => import('./pages/Dashboard'))
// const VendorDashboard = lazy(() => import('./pages/VendorDashboard'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
    //   { path: 'shop', element: <Shop /> },
    //   { path: 'product/:id', element: <ProductDetails /> },
    //   { path: 'cart', element: <Cart /> },
    //   { path: 'checkout', element: <Checkout /> },
    //   { path: 'login', element: <Login /> },
    //   { path: 'register', element: <Register /> },
    //   { 
    //     path: 'dashboard', 
    //     element: <ProtectedRoute><Dashboard /></ProtectedRoute> 
    //   },
    //   { 
    //     path: 'vendor-dashboard', 
    //     element: <ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute> 
    //   },
    ],
  },
])