import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiUsers, FiShoppingBag, FiBox } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
    { name: 'Vendors', icon: <FiShoppingBag />, path: '/admin/vendors' },
    { name: 'Products', icon: <FiBox />, path: '/admin/products' },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-b from-indigo-800 to-indigo-900 text-white h-screen fixed top-0 flex flex-col shadow-lg z-20 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <button
        className="p-4 text-left hover:bg-indigo-700 flex items-center"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FiMenu className="text-2xl" />
        {!isCollapsed && <span className="ml-2 font-semibold">Toggle Menu</span>}
      </button>
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `p-4 flex items-center hover:bg-indigo-700 transition-colors ${
              isActive ? 'bg-indigo-600' : ''
            }`
          }
        >
          <div className="text-2xl">{item.icon}</div>
          {!isCollapsed && <span className="ml-2 font-semibold">{item.name}</span>}
        </NavLink>
      ))}
    </motion.aside>
  );
};

export default AdminSidebar;