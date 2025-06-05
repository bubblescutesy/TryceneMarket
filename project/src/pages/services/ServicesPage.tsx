import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getServices, Service } from '../../data/mockData';
import { 
  MapPin, 
  Star, 
  Filter, 
  Search, 
  Calendar, 
  Clock,
  SlidersHorizontal
} from 'lucide-react';

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState('popularity'); // popularity, price-low, price-high, newest

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await getServices();
        setServices(data);
        setFilteredServices(data);
        
        // Initialize search query from URL if present
        const queryParam = searchParams.get('search');
        if (queryParam) {
          setSearchQuery(queryParam);
        }
        
        // Initialize category from URL if present
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategories([categoryParam]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchParams]);

  // Apply filters whenever filter criteria changes
  useEffect(() => {
    let results = [...services];
    
    // Apply search query filter
    if (searchQuery.trim()) {
      results = results.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(service => 
        selectedCategories.includes(service.category.toLowerCase())
      );
    }
    
    // Apply location filter
    if (selectedLocation) {
      results = results.filter(service => 
        service.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    // Apply price range filter
    results = results.filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    // Apply sorting
    switch(sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'popularity':
      default:
        results.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredServices(results);
  }, [services, searchQuery, selectedCategories, selectedLocation, priceRange, sortBy]);

  // All unique categories from services
  const categories = [...new Set(services.map(service => service.category.toLowerCase()))];
  
  // All unique locations from services
  const locations = [...new Set(services.map(service => service.location))];

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL to reflect search
    searchParams.set('search', searchQuery);
    setSearchParams(searchParams);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedLocation('');
    setSearchQuery('');
    setSortBy('popularity');
    searchParams.delete('search');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-12">
      <div className="bg-primary-500 text-white py-8">
        <div className="container">
          <h1 className="text-3xl font-bold font-heading">Browse Services</h1>
          <p className="mt-2">Find quality services from local providers</p>
        </div>
      </div>
      
      <div className="container pt-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-neutral-300 rounded-md shadow-sm"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-medium text-lg flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h2>
                <button 
                  onClick={resetFilters}
                  className="text-primary-600 text-sm hover:underline"
                >
                  Reset All
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <h3 className="font-medium mb-3">Search</h3>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search services..."
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
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">
                        ${priceRange[0].toFixed(2)}
                      </span>
                      <span className="text-sm text-neutral-600">
                        ${priceRange[1].toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${index}`}
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`category-${index}`}
                          className="text-sm text-neutral-700 capitalize"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Location */}
                <div>
                  <h3 className="font-medium mb-3">Location</h3>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="select"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services List */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-neutral-600 mb-4 sm:mb-0">
                  Showing {filteredServices.length} services
                </p>
                
                <div className="flex items-center">
                  <label htmlFor="sortBy" className="mr-2 text-sm text-neutral-600">
                    Sort by:
                  </label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select max-w-xs"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-xl font-medium mb-2">No Services Found</h3>
                <p className="text-neutral-600 mb-6">
                  We couldn't find any services that match your criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredServices.map(service => (
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
                      <div className="absolute bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center text-white">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{service.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1">
                      <div className="flex items-center mb-2">
                        <div className="hidden md:flex items-center mr-3">
                          <MapPin className="w-4 h-4 text-neutral-500 mr-1" />
                          <span className="text-sm text-neutral-500">{service.location}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-neutral-500">
                            {service.rating.toFixed(1)} ({service.reviews.length} reviews)
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-xl text-neutral-800 mb-2">{service.name}</h3>
                      
                      <p className="text-neutral-600 mb-4">
                        {service.description.length > 150 
                          ? `${service.description.substring(0, 150)}...` 
                          : service.description
                        }
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-auto">
                        <p className="font-bold text-xl text-primary-600">
                          ${service.price.toFixed(2)}
                        </p>
                        
                        <div className="flex items-center text-sm text-neutral-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{service.duration} mins</span>
                        </div>
                        
                        <div className="badge badge-primary flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{service.availableDays.length} days available</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;