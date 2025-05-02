import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiBell, FiLogOut, FiShoppingCart } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks/hooks';
import { logout } from '../redux/slices/auth.slice';
import CategoriesDropdown from './CategoriesDropdown';
import { fetchCartItems } from '../services/cart';
import CartComponent from './Cart';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navItems = ['Home', 'Shop', 'Categories', 'About', 'Contact'];
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const token = useAppSelector((state) => state.auth?.token || '');

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const response = await fetchCartItems(token);
        if (response.success) {
          setCartItemCount(response.cartItems.length);
        }
      } catch (err) {
        console.error('Failed to load cart count', err);
      }
    };
  
    if (token) {
      loadCartCount();
    }
  }, [token, isCartOpen]);

  const icons = [
    <FiSearch key="search" />, 
    <FiHeart key="heart" />, 
    <FiShoppingBag key="bag" />, 
    <FiBell key="bell" />
  ];

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsCategoriesDropdownOpen(false);
  };

  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent"
        >
          TrendyNest
        </motion.div>

        <div className="hidden md:flex space-x-10 relative">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={item === 'Shop' ? '/shop' : item === 'Categories' ? '#' : `/${item.toLowerCase()}`}
              onClick={item === 'Categories' ? toggleCategoriesDropdown : undefined}
              whileHover={{ scale: 1.1, color: '#4F46E5' }}
              className={`text-gray-700 font-medium hover:text-indigo-600 transition-colors ${
                item === 'Categories' && isCategoriesDropdownOpen ? 'text-indigo-600' : ''
              }`}
            >
              {item}
            </motion.a>
          ))}
          <CategoriesDropdown
            isOpen={isCategoriesDropdownOpen}
            onClose={() => setIsCategoriesDropdownOpen(false)}
          />
        </div>

        <div className="flex items-center space-x-6 relative">
          {icons.map((Icon, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="p-2 text-gray-700 hover:text-indigo-600 transition-colors text-2xl"
            >
              {Icon}
            </motion.button>
          ))}

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-gray-700 hover:text-indigo-600 transition-colors text-2xl relative"
          >
            <div className="relative">
              <FiShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          </motion.button>

          {/* User Dropdown */}
          <div className="relative">
            <motion.button
              onClick={toggleUserDropdown}
              className="p-2 text-gray-700 hover:text-indigo-600 transition-colors text-2xl flex items-center space-x-2"
            >
              <FiUser />
              {user && (
                <span className="text-gray-700 font-medium text-sm">{user.username.toUpperCase()}</span>
              )}
            </motion.button>
            
            <AnimatePresence>
              {isUserDropdownOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                >
                  <div className="px-4 py-2 text-gray-700 font-medium">
                    {user.role.toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
    {/* Cart Component - Placed outside other elements */}
    <CartComponent isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;