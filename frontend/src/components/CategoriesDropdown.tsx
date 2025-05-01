import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/hooks';
import { fetchCategories } from '../services/categories/api';
import { fetchSubCategories } from '../services/subCategories/api';
import { Category } from '../types/categories/category';
import { SubCategory } from '../types/subCategories/subCategory';
import toast from 'react-hot-toast';
import { FiX, FiChevronRight } from 'react-icons/fi';

interface CategoriesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ isOpen, onClose }) => {
  const token = useAppSelector((state) => state.auth?.token || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Memoized data loading function
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [categoriesResponse, subCategoriesResponse] = await Promise.all([
        fetchCategories(token),
        fetchSubCategories(token),
      ]);

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.categories);
      } else {
        setError(categoriesResponse.message);
      }

      if (subCategoriesResponse.success) {
        setSubCategories(subCategoriesResponse.subCategories);
      } else {
        setError(subCategoriesResponse.message);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Fetch data when dropdown opens
  useEffect(() => {
    if (token && isOpen) {
      loadData();
    }
  }, [token, isOpen, loadData]);

  // Close dropdown on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle sub-category click
  const handleSubCategoryClick = (subCategoryId: string) => {
    navigate(`/customer/shop?subCategoryId=${subCategoryId}`);
    onClose();
  };

  // Group subcategories by category for better performance
  const subCategoriesByCategory = subCategories.reduce<Record<string, SubCategory[]>>(
    (acc, subCategory) => {
      if (!acc[subCategory.categoryId]) {
        acc[subCategory.categoryId] = [];
      }
      acc[subCategory.categoryId].push(subCategory);
      return acc;
    }, {});

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
          
          {/* Dropdown content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 mx-auto w-full max-w-4xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl z-50 border border-gray-100 p-6 overflow-y-auto max-h-[80vh] focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="categories-dropdown-title"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="categories-dropdown-title" className="text-2xl font-bold text-violet-800">
                Shop by Category
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full"
                aria-label="Close categories dropdown"
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            </div>

            {error && (
              <div className="text-red-600 text-center mb-4 p-3 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
              </div>
            ) : categories.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full py-8">
                No categories found.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const categorySubs = subCategoriesByCategory[category.categoryId] || [];
                  
                  return (
                    <motion.div
                      key={category.categoryId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-indigo-600 mb-3 flex items-center">
                        {category.name}
                        {categorySubs.length > 0 && (
                          <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                            {categorySubs.length}
                          </span>
                        )}
                      </h3>
                      
                      {categorySubs.length > 0 ? (
                        <ul className="space-y-2">
                          {categorySubs.map((subCategory) => (
                            <motion.li
                              key={subCategory.subCategoryId}
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center group"
                            >
                              <button
                                onClick={() => handleSubCategoryClick(subCategory.subCategoryId)}
                                className="text-gray-700 hover:text-pink-500 cursor-pointer text-sm font-medium flex items-center w-full text-left py-1"
                                aria-label={`Browse ${subCategory.name}`}
                              >
                                <FiChevronRight className="mr-1 text-gray-400 group-hover:text-pink-500 transition-colors" />
                                {subCategory.name}
                              </button>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 text-sm italic">No sub-categories</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CategoriesDropdown;