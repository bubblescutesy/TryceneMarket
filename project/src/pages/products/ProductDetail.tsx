import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, sendMessage } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
  MapPin, 
  Star, 
  ArrowLeft, 
  MessageSquare, 
  ShoppingBag, 
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { Product } from '../../data/mockData';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct(data);
          // Initialize selected color and size if available
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSendMessage = async () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
      return;
    }

    if (!product || !message.trim()) return;

    try {
      await sendMessage({
        senderId: user.id,
        receiverId: product.sellerId,
        content: message
      });
      
      setMessage('');
      alert('Message sent successfully!');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
      return;
    }

    if (!product) return;

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      color: selectedColor,
      size: selectedSize,
      sellerId: product.sellerId
    };

    // In a real application, we would add this item to the cart
    // For now, we'll just show an alert
    console.log('Adding to cart:', cartItem);
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const nextImage = () => {
    if (!product) return;
    setActiveImage((activeImage + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setActiveImage((activeImage - 1 + product.images.length) % product.images.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-12">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h3 className="text-xl font-medium mb-4">{error || 'Product not found'}</h3>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen pb-12">
      {/* Back Button */}
      <div className="container pt-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      {/* Product Details */}
      <div className="container py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {/* Product Images */}
            <div className="lg:col-span-1 space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg border border-neutral-200">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 text-neutral-700 hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 text-neutral-700 hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0
                        ${activeImage === index ? 'border-primary-500' : 'border-transparent'}`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-neutral-500 mr-1" />
                  <span className="text-sm text-neutral-500">{product.location}</span>
                  <span className="mx-2 text-neutral-300">•</span>
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-neutral-500">{product.rating.toFixed(1)}</span>
                  <span className="mx-2 text-neutral-300">•</span>
                  <span className="text-sm text-neutral-500">{product.reviews.length} reviews</span>
                </div>
                
                <h1 className="text-3xl font-bold font-heading text-neutral-800 mb-3">
                  {product.name}
                </h1>
                
                <p className="text-neutral-600 mb-4">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <p className="text-2xl font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </p>
                  
                  <div className="badge badge-success flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>In Stock: {product.availability}</span>
                  </div>
                </div>
              </div>
              
              {/* Product Options */}
              <div className="space-y-6 border-t border-b border-neutral-200 py-6">
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 mb-3">
                      Color: <span className="capitalize">{selectedColor}</span>
                    </h3>
                    <div className="flex space-x-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center
                            ${selectedColor === color 
                              ? 'border-primary-600 ring-2 ring-primary-200' 
                              : 'border-neutral-300'}`}
                          aria-label={`Select ${color} color`}
                        >
                          <span className="sr-only">{color}</span>
                          <span 
                            className="w-6 h-6 rounded-full"
                            style={{ 
                              backgroundColor: 
                                color.toLowerCase() === 'natural' ? '#D2B48C' :
                                color.toLowerCase()
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-700 mb-3">
                      Size: {selectedSize}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded border text-sm font-medium
                            ${selectedSize === size 
                              ? 'bg-primary-50 border-primary-600 text-primary-700' 
                              : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 border border-neutral-300 rounded-l-md"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-3 py-1 border-t border-b border-neutral-300 text-center focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 border border-neutral-300 rounded-r-md"
                      disabled={quantity >= product.availability}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex items-center justify-center flex-1 py-3"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                
                <button 
                  onClick={() => document.getElementById('message-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline flex items-center justify-center py-3"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="border-t border-neutral-200 p-6">
            <h2 className="text-xl font-bold font-heading mb-6">
              Customer Reviews ({product.reviews.length})
            </h2>
            
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-neutral-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.userName}</span>
                    </div>
                    <p className="text-neutral-600 mb-2">{review.comment}</p>
                    <p className="text-sm text-neutral-500">
                      {review.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-600">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
          
          {/* Contact Seller Section */}
          <div id="message-section" className="border-t border-neutral-200 p-6">
            <h2 className="text-xl font-bold font-heading mb-6">
              Contact Seller
            </h2>
            
            {user ? (
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-md min-h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ask the seller a question about this product..."
                ></textarea>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="btn-primary flex items-center"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            ) : (
              <div className="bg-neutral-100 p-6 rounded-lg text-center">
                <p className="text-neutral-700 mb-4">
                  Please log in to contact the seller.
                </p>
                <button
                  onClick={() => navigate('/login', { state: { from: { pathname: `/products/${id}` } } })}
                  className="btn-primary"
                >
                  Login to Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;