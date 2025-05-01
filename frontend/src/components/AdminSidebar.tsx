import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, JSX } from 'react';
import { FiMenu, FiUsers, FiShoppingBag, FiBox, FiChevronDown } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
  subItems: SubMenuItem[];
}

interface AdminSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const adminMenuItems: MenuItem[] = [
    {
      name: 'Users',
      icon: <FiUsers />,
      path: '/admin/users',
      subItems: [
        { name: 'All Users', path: '/admin/users/all' },
        { name: 'Admins', path: '/admin/users/admins' },
        { name: 'Customers', path: '/admin/users/customers' },
      ],
    },
    {
      name: 'Vendors',
      icon: <FiShoppingBag />,
      path: '/admin/vendors',
      subItems: [
        { name: 'All Vendors', path: '/admin/vendors/all' },
        { name: 'Pending', path: '/admin/vendors/pending' },
        { name: 'Approved', path: '/admin/vendors/approved' },
      ],
    },
    {
      name: 'Products',
      icon: <FiBox />,
      path: '/admin/products',
      subItems: [
        { name: 'All Products', path: '/admin/products/all' },
        { name: '⚠️ Pending', path: '/admin/products/pending' },
        { name: '✔️ Approved', path: '/admin/products/approved' },
        { name: '❌ Rejected', path: '/admin/products/rejected' },
      ],
    },
  ];

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    setOpenDropdown(null); // Close any open dropdown when collapsing
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FiMenu className="text-xl text-purple-800" />
        </motion.button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 overflow-y-auto" ref={dropdownRef}>
        {adminMenuItems.map((item) => (
          <div key={item.name} className="relative">
            <div
              className={`group relative flex items-center p-4 mx-2 rounded-lg transition-colors hover:bg-indigo-200/30 cursor-pointer ${
                location.pathname === item.path || item.subItems.some((sub) => location.pathname === sub.path)
                  ? 'bg-indigo-200/50 shadow-md'
                  : ''
              }`}
              onClick={() => toggleDropdown(item.name)}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-xl text-purple-800 min-w-[24px]"
              >
                {item.icon}
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 flex-1 flex items-center justify-between"
                  >
                    <span className="font-semibold text-purple-500 whitespace-nowrap">
                      {item.name}
                    </span>
                    <FiChevronDown
                      className={`text-purple-500 transition-transform ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </motion.div>
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
              {!isCollapsed &&
                (location.pathname === item.path ||
                  item.subItems.some((sub) => location.pathname === sub.path)) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-4 w-2 h-2 bg-pink-500 rounded-full"
                  />
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {openDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mx-2 rounded-lg overflow-hidden ${
                    isCollapsed ? 'absolute left-20 top-0 bg-white/90 backdrop-blur-lg shadow-md' : 'ml-10'
                  }`}
                >
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium text-purple-500 hover:bg-indigo-100/50 transition-colors ${
                          isActive ? 'bg-indigo-100/70' : ''
                        }`
                      }
                      onClick={() => setOpenDropdown(null)} // Close dropdown on selection
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </motion.aside>
  );
};

export default AdminSidebar;