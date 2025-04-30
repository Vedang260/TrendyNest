import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiUsers, FiShoppingBag, FiBox } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';

interface AdminSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const adminMenuItems = [
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
    { name: 'Vendors', icon: <FiShoppingBag />, path: '/admin/vendors' },
    { name: 'Products', icon: <FiBox />, path: '/admin/products' },
  ];

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`bg-white/90 backdrop-blur-lg text-purple-700 h-screen fixed top-0 left-0 flex flex-col shadow-xl z-40 overflow-hidden`}
    >
      {/* Logo Section */}
      <div className="p-4 pt-6 flex items-center justify-between border-b border-gray-700">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent whitespace-nowrap"
            >
              Admin
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCollapse}
          className="p-2 rounded-full hover:bg-indigo-200/30 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiMenu className="text-xl text-purple-800" />
        </motion.button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 overflow-y-auto">
        {adminMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center p-4 mx-2 rounded-lg transition-colors hover:bg-indigo-200/30 ${
                isActive ? 'bg-indigo-200/50 shadow-md' : ''
              }`
            }
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-xl text-purple-800 min-w-[24px]"
            >
              {item.icon}
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 font-semibold text-purple-500 whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
            
            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-full ml-2 bg-indigo-300 text-purple-500 text-sm font-medium px-3 py-1 rounded-lg shadow-md hidden group-hover:block z-50"
              >
                {item.name}
              </motion.div>
            )}
            
            {!isCollapsed && location.pathname === item.path && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-4 w-2 h-2 bg-pink-500 rounded-full"
              />
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default AdminSidebar;