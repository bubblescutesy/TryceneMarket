import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getServices, Product, Service } from '../data/mockData';
import { 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  Star, 
  ArrowRight, 
  Search,
  Store,
  Scissors,
  Utensils,
  Shirt,
  Home as HomeIcon,
  Car,
  Smartphone
} from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      const products = await getProducts();
      const services = await getServices();
      
      // Just take a few for the featured sections
      setFeaturedProducts(products.slice(0, 4));
      setFeaturedServices(services.slice(0, 2));
    };
    
    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const path = searchCategory === 'services' ? 'services' : 'products';
      window.location.href = `/${path}?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const categories = [
    { name: 'Fashion', icon: <Shirt className="w-8 h-8" />, link: '/products?category=fashion' },
    { name: 'Food', icon: <Utensils className="w-8 h-8" />, link: '/products?category=food' },
    { name: 'Home', icon: <HomeIcon className="w-8 h-8" />, link: '/products?category=home' },
    { name: 'Beauty', icon: <Scissors className="w-8 h-8" />, link: '/services?category=beauty' },
    { name: 'Auto', icon: <Car className="w-8 h-8" />, link: '/services?category=auto' },
    { name: 'Tech', icon: <Smartphone className="w-8 h-8" />, link: '/services?category=tech' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                Discover Local Products and Services in Your Community
              </h1>
              <p className="text-lg md:text-xl text-primary-50">
                Connect with trusted local retailers and service providers in African communities
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 max-w-2xl">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="What are you looking for?"
                    className="w-full px-4 py-3 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="sm:w-40">
                  <select 
                    className="w-full px-4 py-3 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="products">Products</option>
                    <option value="services">Services</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-600 transition-colors flex items-center justify-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  <span>Search</span>
                </button>
              </form>
            </div>

            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/7731350/pexels-photo-7731350.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" 
                alt="African marketplace" 
                className="rounded-lg shadow-lg object-cover h-96 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-neutral-800 mb-4">
              Browse Categories
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our diverse range of products and services from local vendors and service providers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-200 transition-colors">
                  {category.icon}
                </div>
                <span className="font-medium text-neutral-800">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-heading text-neutral-800">
              Featured Products
            </h2>
            <Link 
              to="/products" 
              className="flex items-center text-primary-500 hover:text-primary-600 font-medium"
            >
              View all
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Link 
                to={`/products/${product.id}`} 
                key={product.id}
                className="card group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{product.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-neutral-600">{product.rating.toFixed(1)}</span>
                  </div>
                  <h3 className="font-medium text-lg text-neutral-800 mb-1">{product.name}</h3>
                  <p className="text-neutral-600 text-sm mb-2">
                    {product.description.length > 70 
                      ? `${product.description.substring(0, 70)}...` 
                      : product.description
                    }
                  </p>
                  <p className="font-bold text-primary-600">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-heading text-neutral-800">
              Featured Services
            </h2>
            <Link 
              to="/services" 
              className="flex items-center text-primary-500 hover:text-primary-600 font-medium"
            >
              View all
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredServices.map(service => (
              <Link 
                to={`/services/${service.id}`} 
                key={service.id}
                className="card group flex flex-col md:flex-row overflow-hidden"
              >
                <div className="w-full md:w-1/3 aspect-video md:aspect-square relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-6 flex-1">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-neutral-500 mr-1" />
                    <span className="text-sm text-neutral-500">{service.location}</span>
                    <span className="mx-2 text-neutral-300">•</span>
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-neutral-500">{service.rating.toFixed(1)}</span>
                  </div>
                  <h3 className="font-medium text-lg text-neutral-800 mb-2">{service.name}</h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {service.description.length > 120 
                      ? `${service.description.substring(0, 120)}...` 
                      : service.description
                    }
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="font-bold text-primary-600">${service.price.toFixed(2)}</p>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{service.duration} mins</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-neutral-800 mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Join our community marketplace in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mx-auto mb-4">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Create an Account</h3>
              <p className="text-neutral-600">
                Sign up as a customer, retailer, or service provider to access our marketplace.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Browse or List</h3>
              <p className="text-neutral-600">
                Shop for products, book services, or list your own offerings to the community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Buy or Sell</h3>
              <p className="text-neutral-600">
                Complete transactions safely and efficiently with our trusted platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-6">
              Ready to Join Our Community Marketplace?
            </h2>
            <p className="text-secondary-100 mb-8 text-lg">
              Whether you're looking to buy products, offer services, or sell your goods, we have the perfect platform for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/register"
                className="btn bg-white text-secondary-600 hover:bg-neutral-100 focus:ring-white"
              >
                Create an Account
              </Link>
              <Link 
                to="/about"
                className="btn bg-transparent border-2 border-white hover:bg-white/10 focus:ring-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;