import { motion, AnimatePresence } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiHeart, FiSearch, FiUser } from 'react-icons/fi';
import { FaTshirt, FaLaptop, FaHome, FaBook, FaRunning } from 'react-icons/fa';

// Define types for hero slides, categories, and products
interface HeroSlide {
  id: number;
  image: string;
  quote: string;
  cta: string;
}

interface Category {
  id: number;
  name: string;
  icon: JSX.Element;
  subcategories: string[];
}

interface Product {
  name: string;
  price: number;
  image: string;
}

const TrendyNestHome: React.FC = () => {
  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Categories data
  const categories: Category[] = [
    { id: 1, name: 'Fashion', icon: <FaTshirt />, subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { id: 2, name: 'Electronics', icon: <FaLaptop />, subcategories: ['Phones', 'Laptops', 'Cameras', 'Audio'] },
    { id: 3, name: 'Home', icon: <FaHome />, subcategories: ['Furniture', 'Decor', 'Kitchen', 'Lighting'] },
    { id: 4, name: 'Books', icon: <FaBook />, subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children'] },
    { id: 5, name: 'Sports', icon: <FaRunning />, subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Cycling'] },
  ];

  // Hero slides data (one for each category)
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      quote: 'Discover Your Unique Style',
      cta: 'Shop Fashion',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509474750991-2b2f26f856e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      quote: 'Tech That Transforms',
      cta: 'Explore Electronics',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      quote: 'Home, Sweet Home',
      cta: 'Browse Home Decor',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4ebf0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      quote: 'Dive into Knowledge',
      cta: 'Shop Books',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      quote: 'Push Your Limits',
      cta: 'Shop Sports Gear',
    },
  ];

  // Featured products data
  const products: Product[] = [
    { name: 'Stylish Jacket', price: 89.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Smartwatch', price: 199.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Cozy Lamp', price: 49.99, image: 'https://images.unsplash.com/photo-1507477335477-0e67d3fd0b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Running Shoes', price: 129.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Leather Bag', price: 79.99, image: 'https://images.unsplash.com/photo-1566150904558-5b1ce726d7d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Headphones', price: 149.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
  ];

  // Auto-rotate hero carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent"
          >
            TrendyNest
          </motion.div>

          <div className="hidden md:flex space-x-10">
            {['Home', 'Shop', 'Categories', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ scale: 1.1, color: '#4F46E5' }}
                className="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            {[<FiSearch />, <FiHeart />, <FiShoppingBag />, <FiUser />].map((Icon, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="p-2 text-gray-700 hover:text-indigo-600 transition-colors text-2xl"
              >
                {Icon}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <div
        className="relative h-[85vh] overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence>
          {heroSlides.map((slide, index) =>
            currentSlide === index ? (
              <motion.div
                key={slide.id}
                className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <motion.div
                  className="text-center z-10 px-6"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                    {slide.quote}
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-xl hover:bg-indigo-700 transition-colors"
                  >
                    {slide.cta}
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Carousel Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-6 top-1/2 z-20 bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-md transition-all"
        >
          <FiChevronLeft className="text-3xl text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
          className="absolute right-6 top-1/2 z-20 bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-md transition-all"
        >
          <FiChevronRight className="text-3xl text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-indigo-600 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Explore Our Categories
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4 text-indigo-600 flex justify-center">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{category.name}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {category.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="text-xs bg-indigo-100 px-3 py-1 rounded-full text-indigo-700 font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
            <button className="text-indigo-600 font-semibold hover:underline">View All</button>
          </motion.div>

          <div className="relative">
            <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
              {products.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div
                    className="h-56 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                    >
                      <FiHeart className="text-gray-500 hover:text-indigo-600" />
                    </motion.div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <div className="flex items-center mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-2">(32)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">${item.price}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="text-white bg-indigo-600 p-3 rounded-full hover:bg-indigo-700 transition-colors"
                      >
                        <FiShoppingBag />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sales Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-yellow-400 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/90 rounded-3xl p-10 md:p-16 text-center shadow-2xl"
          >
            {/* Coupon Images */}
            <motion.img
              src="./images/coupon-group-min.png"
              alt="Coupon"
              className="absolute top-0 left-0 w-24 md:w-32 transform -translate-x-8 -translate-y-8 rotate-12 opacity-80"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            <motion.img
              src="https://images.unsplash.com/photo-1612347085956-7e0d0f5c58e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Coupon"
              className="absolute bottom-0 right-0 w-24 md:w-32 transform translate-x-8 translate-y-8 -rotate-12 opacity-80"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Sale Badge */}
            <motion.div
              className="absolute top-4 right-4 bg-yellow-400 text-red-600 font-bold text-lg px-4 py-2 rounded-full shadow-lg"
              initial={{ rotate: -10, opacity: 0 }}
              whileInView={{ rotate: 10, opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              60% OFF
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
              Mega Seasonal Sale!
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Use code <span className="font-bold text-red-600">TRENDY60</span> for up to 60% off! Limited time only!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-red-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:bg-red-700 transition-colors"
            >
              Shop the Sale
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">TrendyNest</h3>
              <p className="text-gray-400">Your one-stop shop for trendy and unique products.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Shop</h4>
              <ul className="space-y-3">
                {['All Products', 'New Arrivals', 'Featured', 'Discounts'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">About</h4>
              <ul className="space-y-3">
                {['Our Story', 'Blog', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-3">
                {['Help Center', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} TrendyNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrendyNestHome;