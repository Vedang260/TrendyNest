import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useAppSelector } from '../redux/hooks/hooks';
import { fetchCartItems, updateCartItem, removeCartItem } from '../services/cart';
import { createCheckoutSession } from '../services/payment';
import { CartItem } from '../types/cart';
import toast from 'react-hot-toast';

interface CartComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ isOpen, onClose }) => {
  const token = useAppSelector((state) => state.auth?.token);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});
  const contentRef = useRef<HTMLDivElement>(null); // Ref for scrollable content
  const headerRef = useRef<HTMLDivElement>(null); // Ref for cart header

  // Fetch cart items
  useEffect(() => {
    const loadCartItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (token) {
          const response = await fetchCartItems(token);
          if (response.success) {
            setCartItems(response.cartItems);
          } else {
            setError(response.message);
          }
        }
      } catch (err: any) {
        setError(err.message);
        toast.error('Failed to load cart items');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && token) {
      loadCartItems();
    }
  }, [isOpen, token]);

  // Reset scroll and focus when cart opens or items are loaded
  useEffect(() => {
    if (isOpen && !isLoading && contentRef.current) {
      // Reset scroll position to top after a slight delay
      const timer = setTimeout(() => {
        contentRef.current!.scrollTop = 0;
      }, 100);

      // Set focus to header to prevent auto-focus on buttons
      if (headerRef.current) {
        headerRef.current.focus();
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoading]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.quantity * item.product.price), 0
  );

  // Handle quantity change
  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;

    try {
      setIsUpdating(prev => ({ ...prev, [cartItemId]: true }));
      if (token) {
        const response = await updateCartItem(cartItemId, newQuantity, token);
      
        if (response.success) {
          setCartItems(prev => prev.map(item => 
            item.cartItemsId === cartItemId 
              ? { ...item, quantity: newQuantity } 
              : item
          ));
        } else {
          toast.error(response.message);
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update quantity');
    } finally {
      setIsUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  // Handle remove item
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      setIsUpdating(prev => ({ ...prev, [cartItemId]: true }));
      if (token) {
        const response = await removeCartItem(cartItemId, token);
      
        if (response.success) {
          setCartItems(prev => prev.filter(item => item.cartItemsId !== cartItemId));
          toast.success('Item removed from cart');
        } else {
          toast.error(response.message);
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove item');
    } finally {
      setIsUpdating(prev => ({ ...prev, [cartItemId]: false }));
    }
  };

  // handle Checkout Session
  const handleCreateCheckoutSession = async() => {
    try{
      if(cartItems && token){
        const response = await createCheckoutSession(cartItems, totalPrice, token);
        if (response.data?.url) {
            window.location.href = response.data.url;
        
      }
    }
    }catch(error: any){

    }
  }
  // Close on Escape key
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          
          {/* Cart Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div
                ref={headerRef}
                tabIndex={-1}
                className="p-6 border-b border-gray-100 flex justify-between items-center"
              >
                <div className="flex items-center space-x-2">
                  <FiShoppingCart className="text-2xl text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Cart ({cartItems.length})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-full transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Content */}
              <div ref={contentRef} className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-full h-24 bg-gray-100 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-full text-red-500">
                    <p>{error}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                      Retry
                    </button>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <FiShoppingCart className="text-5xl mb-4" />
                    <p className="text-xl">Your cart is empty</p>
                    <p className="text-sm mt-2">Start shopping to add items</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.li
                        key={item.cartItemsId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center p-4 bg-gray-50 rounded-xl"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={item.product.mainImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="ml-4 flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-pink-500">
                            {item.product.subCategory.name}
                          </p>
                          <p className="text-lg font-bold text-indigo-600 mt-1">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleQuantityChange(item.cartItemsId, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating[item.cartItemsId]}
                            className="p-1 text-gray-500 hover:text-indigo-600 disabled:text-gray-300 rounded-full transition-colors"
                          >
                            <FiMinus />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {isUpdating[item.cartItemsId] ? (
                              <div className="inline-block w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.cartItemsId, item.quantity + 1)}
                            disabled={item.quantity >= 10 || isUpdating[item.cartItemsId]}
                            className="p-1 text-gray-500 hover:text-indigo-600 disabled:text-gray-300 rounded-full transition-colors"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.cartItemsId)}
                          disabled={isUpdating[item.cartItemsId]}
                          className="ml-4 p-2 text-gray-500 hover:text-red-600 disabled:text-gray-300 rounded-full transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-xl font-bold text-indigo-600">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                    onClick={() => handleCreateCheckoutSession()}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartComponent;