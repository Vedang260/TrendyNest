import { motion } from 'framer-motion';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiBell } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const navItems = ['Home', 'Shop', 'Categories', 'About', 'Contact'];
  const icons = [<FiSearch />, <FiHeart />, <FiShoppingBag />, <FiBell/>, <FiUser />];

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

        <div className="flex items-center space-x-6">
          {icons.map((Icon, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="p-2 text-gray-700 hover:text-indigo-600 transition-colors text-2xl"
            >
              {Icon}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;