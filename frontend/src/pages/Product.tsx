import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiChevronLeft, FiShare2, FiCheck } from 'react-icons/fi';
import { useAppSelector } from '../redux/hooks/hooks';
import { fetchProductDetails } from '../services/products/api';
import { ShopProducts } from '../types/products/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { addToCart } from '../services/cart';

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth?.token || '');
  const [product, setProduct] = useState<ShopProducts | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        if (!productId) {
          throw new Error('Product ID not found');
        }
        const response = await fetchProductDetails(productId, token);
        if (response.success) {
          setProduct(response.product[0]);
          setError(null);
        } else {
          setError(response.message);
          toast.error(response.message);
        }
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [productId, token]);

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (!productId) return;
    try {
      const response = await addToCart(productId, token, quantity);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Handle Quantity Change
  const handleQuantityChange = (value: number) => {
    const newValue = quantity + value;
    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 h-96 bg-gray-200" />
              <div className="p-8 md:w-1/2 space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-24 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded w-1/3" />
                <div className="h-12 bg-gray-200 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg inline-block"
          >
            <h3 className="text-2xl font-medium text-gray-800 mb-4">
              {error || 'Product not found'}
            </h3>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
            >
              <FiChevronLeft className="mr-1" />
              Back to Shop
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FiChevronLeft className="mr-1" />
          Back to Shop
        </button>
      </motion.div>

      {/* Product Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 rounded-xl overflow-hidden bg-gray-50">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-md ${
                    isWishlisted ? 'bg-pink-500 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-600'
                  } transition-all`}
                >
                  <FiHeart className={isWishlisted ? 'fill-current' : ''} />
                </motion.button>
                
                {/* Availability Badge */}
                {product.availabilityStatus !== 'in_stock' && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow">
                    {product?.availabilityStatus?.replace('_', ' ').toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Category Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="hover:text-indigo-600 cursor-pointer">
                    {product?.subCategoryName}
                  </span>
                  <span className="mx-2">/</span>
                </div>
                
                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product?.name}
                </h1>
                
                {/* Brand */}
                <div className="flex items-center mb-4">
                  <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                    {product?.brand}
                  </span>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-indigo-600">
                    ₹{product?.price?.toFixed(2)}
                  </span>
                  {/* {product.originalPrice > product.price && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )} */}
                </div>
                
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product?.description}
                  </p>
                </div>
                
                {/* Quantity Selector */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-colors"
                    >
                      -
                    </motion.button>
                    <div className="px-6 py-2 bg-gray-50 text-center text-lg">
                      {quantity}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={product.availabilityStatus !== 'in_stock'}
                    className={`flex-1 py-4 px-6 rounded-lg font-medium flex items-center justify-center ${
                      product.availabilityStatus === 'in_stock'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 px-6 rounded-lg font-medium border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors"
                  >
                    <FiShare2 className="mr-2" />
                    Share
                  </motion.button>
                </div>
                
                {/* Highlights */}
                {/* {product.highlights && product.highlights.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      {product.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-start"
                        >
                          <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* You May Also Like Section */}
      {/* {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.slice(0, 4).map((related) => (
              <motion.div
                key={related.productId}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/product/${related.productId}`)}
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={related.mainImage}
                    alt={related.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">
                    {related.name}
                  </h3>
                  <p className="text-xs text-pink-500 mb-2">{related.subCategoryName}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-600">
                      ₹{related.price.toFixed(2)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      related.availabilityStatus === 'in_stock' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {related.availabilityStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
       */}
      <Footer />
    </div>
  );
};

export default ProductPage;