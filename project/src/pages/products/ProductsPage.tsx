import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, Product } from '../../data/mockData';
import { 
  MapPin, 
  Star, 
  Filter, 
  Search, 
  ChevronDown, 
  X,
  SlidersHorizontal
} from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        
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
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Apply filters whenever filter criteria changes
  useEffect(() => {
    let results = [...products];
    
    // Apply search query filter
    if (searchQuery.trim()) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(product => 
        selectedCategories.includes(product.category.toLowerCase())
      );
    }
    
    // Apply location filter
    if (selectedLocation) {
      results = results.filter(product => 
        product.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    // Apply price range filter
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
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
    
    setFilteredProducts(results);
  }, [products, searchQuery, selectedCategories, selectedLocation, priceRange, sortBy]);

  // All unique categories from products
  const categories = [...new Set(products.map(product => product.category.toLowerCase()))];
  
  // All unique locations from products
  const locations = [...new Set(products.map(product => product.location))];

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
          <h1 className="text-3xl font-bold font-heading">Browse Products</h1>
          <p className="mt-2">Find quality products from local retailers</p>
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
                        placeholder="Search products..."
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
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-neutral-600 mb-4 sm:mb-0">
                  Showing {filteredProducts.length} products
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
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                <p className="text-neutral-600 mb-6">
                  We couldn't find any products that match your criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;