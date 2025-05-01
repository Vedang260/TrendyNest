import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useAppSelector } from '../redux/hooks/hooks';
import { fetchProductsForCustomers } from '../services/products/api';
import { ProductsResponse, Product } from '../types/products/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const Shop: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth?.token || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get subCategoryId from URL
  const queryParams = new URLSearchParams(location.search);
  const subCategoryId = queryParams.get('subCategoryId');

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response: ProductsResponse = await fetchProductsForCustomers(token);
        if (response.success) {
          // Filter products by subCategoryId if provided
          const filteredProducts = subCategoryId
            ? response.products.filter((p) => p.subCategoryId === subCategoryId)
            : response.products;
          setProducts(filteredProducts);
          setError(null);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      }
    };
    if (token) {
      loadProducts();
    }
  }, [token, subCategoryId]);

  // Handle Add to Cart
  const handleAddToCart = async (productId: string) => {
    try {
      const response = await addToCart(productId, token);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Handle Product Click
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800">
              {subCategoryId ? 'Products' : 'All Products'}
            </h2>
            <button
              onClick={() => navigate('/shop')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              View All
            </button>
          </motion.div>

          {error && (
            <div className="text-red-600 text-center mb-6">{error}</div>
          )}

          {products.length === 0 ? (
            <p className="text-gray-500 text-center">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.productId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg"
                >
                  <div
                    className="h-56 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${product.mainImage})` }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                    >
                      <FiHeart className="text-gray-500 hover:text-indigo-600" />
                    </motion.div>
                  </div>
                  <div className="p-5">
                    <h3
                      className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-indigo-600"
                      onClick={() => handleProductClick(product.productId)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-pink-500 mb-2">{product.subCategoryName}</p>
                    <p className="text-sm text-gray-500 mb-3 capitalize">
                      {product.availabilityStatus.replace('_', ' ')}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleAddToCart(product.productId)}
                        className="text-white bg-indigo-600 p-3 rounded-full hover:bg-indigo-700 transition-colors"
                      >
                        <FiShoppingBag />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;