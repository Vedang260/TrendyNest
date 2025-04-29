import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// import ProtectedRoute from './components/common/ProtectedRoute'
 const App = lazy(() => import('./App'));
 const Home = lazy(() => import('./pages/Home'));
 const Register = lazy(() => import('./pages/Register'))

 export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // This should contain <Outlet />
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);
