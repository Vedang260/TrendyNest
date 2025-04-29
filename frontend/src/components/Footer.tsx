const Footer: React.FC = () => {
    const shopLinks = ['All Products', 'New Arrivals', 'Featured', 'Discounts'];
    const aboutLinks = ['Our Story', 'Blog', 'Careers', 'Press'];
    const contactLinks = ['Help Center', 'Shipping', 'Returns', 'Size Guide'];
  
    return (
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
                {shopLinks.map((item) => (
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
                {aboutLinks.map((item) => (
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
                {contactLinks.map((item) => (
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
    );
  };
  
  export default Footer;