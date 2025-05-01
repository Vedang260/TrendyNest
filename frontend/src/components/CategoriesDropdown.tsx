import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/hooks';
import { fetchCategories} from '../services/categories/api';
import { fetchSubCategories } from '../services/subCategories/api';
import { Category } from '../types/categories/category';
import { SubCategory } from '../types/subCategories/subCategory';
import toast from 'react-hot-toast';

interface CategoriesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ isOpen, onClose }) => {
  const token = useAppSelector((state) => state.auth?.token || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch categories and sub-categories
  useEffect(() => {
    const loadData = async () => {
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
        toast.error(err.message);
      }
    };

    if (token && isOpen) {
      loadData();
    }
  }, [token, isOpen]);

  // Handle sub-category click
  const handleSubCategoryClick = (subCategoryId: string) => {
    navigate(`/shop?subCategoryId=${subCategoryId}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-0 right-0 mx-auto w-full max-w-4xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl z-50 border border-gray-100 p-6 overflow-y-auto max-h-[80vh]"
        >
          {error && (
            <div className="text-red-600 text-center mb-4">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full">No categories found.</p>
            ) : (
              categories.map((category) => (
                <motion.div
                  key={category.categoryId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-4 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-indigo-600 mb-3">{category.name}</h3>
                  <ul className="space-y-2">
                    {subCategories
                      .filter((sub) => sub.categoryId === category.categoryId)
                      .map((subCategory) => (
                        <motion.li
                          key={subCategory.subCategoryId}
                          whileHover={{ x: 5, color: '#EC4899' }}
                          transition={{ duration: 0.2 }}
                          className="text-gray-700 hover:text-pink-500 cursor-pointer text-sm font-medium"
                          onClick={() => handleSubCategoryClick(subCategory.subCategoryId)}
                        >
                          {subCategory.name}
                        </motion.li>
                      ))}
                    {subCategories.filter((sub) => sub.categoryId === category.categoryId)
                      .length === 0 && (
                      <li className="text-gray-500 text-sm">No sub-categories available</li>
                    )}
                  </ul>
                </motion.div>
              ))
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoriesDropdown;