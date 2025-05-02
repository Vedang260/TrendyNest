import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiFilter, FiX, FiChevronRight } from 'react-icons/fi';
import { useAppSelector } from '../redux/hooks/hooks';
import { fetchProductsForCustomers } from '../services/products/api';
import { ShopProductsResponse, ShopProducts } from '../types/products/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { addToCart } from '../services/cart';

const Shop: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth?.token || '');
  const [products, setProducts] = useState<ShopProducts[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Get subCategoryId from URL
  const queryParams = new URLSearchParams(location.search);
  const subCategoryId = queryParams.get('subCategoryId');

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response: ShopProductsResponse = await fetchProductsForCustomers(token);
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
      } finally {
        setIsLoading(false);
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

  // Apply sorting
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0; // Featured (no sort)
    }
  });

  // Apply price filter
  const filteredProducts = sortedProducts.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-64 md:h-80 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {subCategoryId ? 'Shop Collection' : 'Discover Our Products'}
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            {subCategoryId ? 'Curated selection just for you' : 'Explore our premium collection'}
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Controls Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <FiFilter className="text-indigo-600" />
              <span>Filters</span>
            </button>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <FiChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <p className="text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>₹ {priceRange[0]}</span>
                      <span>₹ {priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-64 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 bg-red-50 inline-block px-6 py-3 rounded-lg">
              {error}
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or browse our other collections</p>
            <button
              onClick={() => {
                setSortOption('featured');
                setPriceRange([0, 1000]);
                navigate('/shop');
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.productId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="relative h-64 bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => handleProductClick(product.productId)}
                >
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
                  >
                    <FiHeart className="text-gray-600 hover:text-red-500 transition-colors" />
                  </motion.button>
                  {product.availabilityStatus === 'out_of_stock' && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      className="font-medium text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1"
                      onClick={() => handleProductClick(product.productId)}
                    >
                      {product.name}
                    </h3>
                    <span className="font-bold text-indigo-600 whitespace-nowrap">
                    ₹ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-pink-500 mb-3">{product.subCategoryName}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.availabilityStatus === 'in_stock' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {(product.availabilityStatus.replace('_', ' ')).toUpperCase()}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(product.productId)}
                      disabled={product.availabilityStatus !== 'in_stock'}
                      className={`p-2 rounded-full ${
                        product.availabilityStatus === 'in_stock'
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      } transition-colors`}
                    >
                      <FiShoppingCart />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Shop;