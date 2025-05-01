import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AdminSidebar from '../../../components/AdminSidebar';
import { fetchAdminPendingProducts, approveProduct, rejectProduct } from '../../../services/products/api';
import { AdminProducts, AdminProductsResponse } from '../../../types/products/products'
import { useAppSelector } from '../../../redux/hooks/hooks';
import toast from 'react-hot-toast';

const PendingProducts: React.FC = () => {
  const [products, setProducts] = useState<AdminProducts[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<AdminProducts | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth?.token || '');
  const popupRef = useRef<HTMLDivElement>(null);
  const limit = 10; // Products per page

  const loadProducts = async () => {
    try {
      const response: AdminProductsResponse = await fetchAdminPendingProducts(token);
      if (response.success) {
        setProducts(response.products);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Fetch pending products
  useEffect(() => {
    if (token) {
      loadProducts();
    }
  }, [token]);

  // Close pop-up on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedProduct(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle approve product
  const handleApprove = async (productId: string) => {
    try {
      const response = await approveProduct(productId, token);
      if (response.success) {
        toast.success(response.message);
        loadProducts();
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Handle reject product
  const handleReject = async (productId: string) => {
    try {
      const response = await rejectProduct(productId, token);
      if (response.success) {
        toast.success(response.message);
        loadProducts();
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Frontend pagination
  const totalPages = Math.ceil(products.length / limit);
  const paginatedProducts = products.slice((page - 1) * limit, page * limit);

  // Pagination controls
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (

    <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
    <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar onCollapseChange={setIsSidebarCollapsed} />
          <motion.main
            initial={{ marginLeft: 256 }}
            animate={{ marginLeft: isSidebarCollapsed ? 0 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1 p-8 bg-gradient-to-b from-gray-100 to-white min-h-[calc(100vh-64px)]"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold text-purple-600 mb-8"
            >
              Pending Products
            </motion.h1>

            {error && <div className="text-red-600 text-center mb-6">{error}</div>}

            {/* Products Table */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-md overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-indigo-100/50 text-purple-700">
                    <th className="p-4 font-semibold">Product ID</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-gray-500">
                        No pending products found.
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map((product, index) => (
                      <motion.tr
                        key={product.productId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-gray-200 hover:bg-indigo-50/30"
                      >
                        <td className="p-4 text-gray-700">
                          {product.productId.slice(0, 8)}...
                        </td>
                        <td
                          className="p-4 text-indigo-600 font-medium cursor-pointer hover:underline"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.name}
                        </td>
                        <td className="p-4 flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApprove(product.productId)}
                            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                            aria-label="Approve product"
                          >
                            <FiCheckCircle />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReject(product.productId)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            aria-label="Reject product"
                          >
                            <FiXCircle />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition-colors"
                >
                  Previous
                </motion.button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <motion.button
                    key={p}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(p)}
                    className={`px-4 py-2 rounded-lg ${
                      page === p
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
                    } transition-colors`}
                  >
                    {p}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition-colors"
                >
                  Next
                </motion.button>
              </div>
            )}

            {/* Product Details Pop-up */}
            <AnimatePresence>
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    ref={popupRef}
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Product Image */}
                      <div className="md:w-1/2 h-64 md:h-auto bg-gray-200">
                        <img
                          src={selectedProduct.mainImage}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Product Details */}
                      <div className="md:w-1/2 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-2xl font-extrabold text-purple-600">
                            {selectedProduct.name}
                          </h2>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedProduct(null)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                            aria-label="Close pop-up"
                          >
                            <FiX className="text-2xl" />
                          </motion.button>
                        </div>
                        <div className="space-y-3 flex-1 text-sm sm:text-base">
                        <p>
                            <span className="font-semibold text-indigo-600">Sub-Category: </span>
                            <span className="text-pink-600  bg-pink-100 px-2 py-1 rounded-md inline-block">{selectedProduct.subCategoryName}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-indigo-600">Brand: </span>
                            <span className="text-blue-800 bg-blue-100 px-2 py-1 rounded-md inline-block">{selectedProduct.brand}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-indigo-600">Description: </span>
                            <span className="text-gray-600">{selectedProduct.description}</span>
                        </p>
                        <p>
                        <span className="font-semibold text-indigo-600">Price: </span>
                        <span className="text-green-800 font-semibold bg-green-200 px-2 py-1 rounded-md inline-block">
                            ₹ {selectedProduct.price.toFixed(2)}
                        </span>
                        </p>
                        <div className="flex flex-wrap gap-8">
                        <p className="flex items-center gap-1">
                            <span className="font-semibold text-indigo-600">Stock Quantity:</span>
                            <span className="text-yellow-950  bg-yellow-200 px-2 py-1 rounded-md inline-block">
                            {selectedProduct.stockQuantity}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${selectedProduct.availabilityStatus === 'in_stock'
                                ? 'bg-green-200 text-green-800'
                                : 'bg-red-200 text-red-800'
                            }`}
                        >
                            {selectedProduct.availabilityStatus === 'in_stock' ? '⚡IN STOCK' : '⚠️ OUT OF STOCK'}
                        </span>
                        </p>

                        </div>
                        <div className="flex flex-wrap gap-8">
                        <p className="flex items-center gap-1">
                            <span className="font-semibold text-indigo-600">Created At:</span>
                            <span className="text-purple-700  bg-purple-100 px-2 py-1 rounded-md inline-block">
                            {new Date(selectedProduct.createdAt).toLocaleDateString()}
                            </span>
                        </p>
                        <p className="flex items-center gap-1">
                            <span className="font-semibold text-indigo-600">Updated At:</span>
                            <span className="text-purple-500  bg-purple-100 px-2 py-1 rounded-md inline-block">
                            {new Date(selectedProduct.updatedAt).toLocaleDateString()}
                            </span>
                        </p>
                        </div>
                    </div>

                        <div className="mt-6 flex space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApprove(selectedProduct.productId)}
                            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReject(selectedProduct.productId)}
                            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default PendingProducts;