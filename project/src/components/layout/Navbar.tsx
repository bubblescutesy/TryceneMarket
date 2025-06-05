import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Menu, 
  X, 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  User,
  LogOut,
  Store,
  MapPin
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4 px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Store className="w-8 h-8 text-primary-500" />
            <span className="font-heading text-xl font-bold text-primary-500">TryceneMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Services
            </NavLink>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products or services..."
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-neutral-500" />
              </button>
            </form>
          </div>

          {/* User Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Notification Icons */}
                <Link to="/messages" className="relative">
                  <MessageSquare className="w-6 h-6 text-neutral-600 hover:text-primary-500 transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </Link>
                
                {/* User Menu */}
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      {user.avatarUrl ? (
                        <img 
                          src={user.avatarUrl} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full text-neutral-500 bg-neutral-200 p-1" />
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                    >
                      <User className="w-4 h-4 mr-2" /> Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-primary-600 hover:text-primary-500"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-600"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 py-4 px-4 shadow-md">
          {/* Search Bar (Mobile) */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products or services..."
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-neutral-500" />
              </button>
            </div>
          </form>
          
          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
          </nav>
          
          {/* User Actions (Mobile) */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-full h-full text-neutral-500 bg-neutral-200 p-1" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                  </div>
                </div>
                
                <Link 
                  to="/messages" 
                  className="flex items-center justify-between py-3 border-b border-neutral-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-3 text-neutral-500" />
                    <span>Messages</span>
                  </div>
                  <span className="bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Link>
                
                <Link 
                  to="/dashboard" 
                  className="flex items-center py-3 border-b border-neutral-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-3 text-neutral-500" />
                  <span>Dashboard</span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center py-3 text-error-600 w-full text-left"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/login" 
                  className="btn-outline w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;