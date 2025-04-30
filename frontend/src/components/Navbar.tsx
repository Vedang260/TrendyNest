import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiBell, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks/hooks';
import { logout } from '../redux/slices/auth.slice';

const Navbar: React.FC = () => {
  const navItems = ['Home', 'Shop', 'Categories', 'About', 'Contact'];
  const icons = [<FiSearch />, <FiHeart />, <FiShoppingBag />, <FiBell />];
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  return (
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

        <div className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ scale: 1.1, color: '#4F46E5' }}
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
            >
              {item}
            </motion.a>
          ))}
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
          <div className="relative">
            <motion.button
              onClick={toggleDropdown}
              className="p-2 text-gray-700 hover:text-indigo-600 transition-colors text-2xl flex items-center space-x-2"
            >
              <FiUser />
              {user && (
                <span className="text-gray-700 font-medium text-sm">{(user.username).toUpperCase()}</span>
              )}
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                >
                  <div className="px-4 py-2 text-gray-700 font-medium">
                    {(user.role).toUpperCase()}
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
  );
};

export default Navbar;