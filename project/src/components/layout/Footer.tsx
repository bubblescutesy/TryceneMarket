import { Link } from 'react-router-dom';
import { Store, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Store className="w-7 h-7 text-primary-400" />
              <span className="font-heading text-xl font-bold text-white">TryceneMarket</span>
            </div>
            <p className="mb-6">
              Connecting African communities with local retailers and service providers.
              Empowering small businesses through technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=clothing" className="hover:text-white transition-colors">
                  Clothing & Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=food" className="hover:text-white transition-colors">
                  Food & Groceries
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="hover:text-white transition-colors">
                  Home & Decor
                </Link>
              </li>
              <li>
                <Link to="/services?category=beauty" className="hover:text-white transition-colors">
                  Beauty & Personal Care
                </Link>
              </li>
              <li>
                <Link to="/services?category=professional" className="hover:text-white transition-colors">
                  Professional Services
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>123 Samora Machel Ave, Harare, Zimbabwe</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>+263 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>info@trycenemarket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} TryceneMarket. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;