import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders, getUserBookings, getUserMessages, Order, Booking, Message } from '../../data/mockData';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import { 
  User, 
  Package, 
  Calendar, 
  MessageSquare, 
  MapPin,
  ShoppingBag,
  Clock
} from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const [ordersData, bookingsData, messagesData] = await Promise.all([
          getUserOrders(user.id),
          getUserBookings(user.id),
          getUserMessages(user.id)
        ]);
        
        setOrders(ordersData);
        setBookings(bookingsData);
        setMessages(messagesData);
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  if (!user) return null;

  const renderProfile = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">My Profile</h2>
        
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-full h-full text-neutral-500 p-6" />
            )}
          </div>
          
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">
                Full Name
              </label>
              <p className="font-medium text-lg">{user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">
                Email
              </label>
              <p>{user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">
                Account Type
              </label>
              <p className="capitalize">{user.role}</p>
            </div>
            
            {user.location && (
              <div>
                <label className="block text-sm font-medium text-neutral-500 mb-1">
                  Location
                </label>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-neutral-500" />
                  {user.location}
                </p>
              </div>
            )}
            
            <div className="pt-2">
              <button className="btn-primary">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrders = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">My Orders</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 border rounded-lg border-dashed border-neutral-300 bg-neutral-50">
            <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
            <p className="text-neutral-600 mb-6">You haven't placed any orders yet.</p>
            <a href="/products" className="btn-primary">
              Browse Products
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div className="bg-neutral-50 p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">
                      Order #{order.id}
                    </p>
                    <p className="text-sm font-medium">
                      Placed on {order.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="mt-2 sm:mt-0">
                    <span className={`
                      inline-flex px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === 'delivered' 
                        ? 'bg-success-100 text-success-800' 
                        : order.status === 'processing' 
                        ? 'bg-accent-100 text-accent-800'
                        : order.status === 'shipped'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-neutral-100 text-neutral-800'
                      }
                    `}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-neutral-100 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/5379215/pexels-photo-5379215.jpeg" 
                        alt="Product" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Product Name</h3>
                      <p className="text-sm text-neutral-500">Quantity: {order.quantity}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t">
                    <div>
                      <p className="font-medium">Total: ${order.totalPrice.toFixed(2)}</p>
                      <p className="text-sm text-neutral-500">Payment: {order.paymentMethod}</p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      <button className="btn-outline text-sm px-4 py-1">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderBookings = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">My Bookings</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 border rounded-lg border-dashed border-neutral-300 bg-neutral-50">
            <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
            <p className="text-neutral-600 mb-6">You haven't booked any services yet.</p>
            <a href="/services" className="btn-primary">
              Browse Services
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking.id} className="border rounded-lg overflow-hidden">
                <div className="bg-neutral-50 p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">
                      Booking #{booking.id}
                    </p>
                    <p className="text-sm font-medium">
                      Booked on {booking.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="mt-2 sm:mt-0">
                    <span className={`
                      inline-flex px-3 py-1 rounded-full text-xs font-medium
                      ${booking.status === 'completed' 
                        ? 'bg-success-100 text-success-800' 
                        : booking.status === 'confirmed' 
                        ? 'bg-primary-100 text-primary-800'
                        : booking.status === 'cancelled'
                        ? 'bg-error-100 text-error-800'
                        : 'bg-accent-100 text-accent-800'
                      }
                    `}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-neutral-100 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg" 
                        alt="Service" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Service Name</h3>
                      <div className="flex items-center text-sm text-neutral-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {booking.date.toLocaleDateString()} at {booking.timeSlot}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t">
                    <p className="font-medium">Total: ${booking.totalPrice.toFixed(2)}</p>
                    
                    <div className="mt-4 sm:mt-0">
                      <button className="btn-outline text-sm px-4 py-1">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMessages = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">My Messages</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 border rounded-lg border-dashed border-neutral-300 bg-neutral-50">
            <MessageSquare className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Messages</h3>
            <p className="text-neutral-600">You don't have any messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`
                  p-4 rounded-lg
                  ${msg.senderId === user.id 
                    ? 'bg-primary-50 ml-8' 
                    : 'bg-neutral-100 mr-8'
                  }
                `}
              >
                <div className="flex justify-between mb-2">
                  <p className="font-medium">
                    {msg.senderId === user.id ? 'You' : 'Seller'}
                  </p>
                  <span className="text-xs text-neutral-500">
                    {msg.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-neutral-700">{msg.content}</p>
              </div>
            ))}
            
            <div className="pt-4">
              <form className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="input flex-1"
                />
                <button 
                  type="submit"
                  className="btn-primary px-4"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-6">
      <div className="container">
        <h1 className="text-2xl font-bold font-heading mb-6">
          Customer Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <DashboardSidebar />
          </div>
          
          <div className="lg:col-span-3">
            {/* Mobile Tabs */}
            <div className="lg:hidden mb-6 overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`
                    px-4 py-2 rounded-md flex items-center
                    ${activeTab === 'profile' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-200'
                    }
                  `}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`
                    px-4 py-2 rounded-md flex items-center
                    ${activeTab === 'orders' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-200'
                    }
                  `}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </button>
                
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`
                    px-4 py-2 rounded-md flex items-center
                    ${activeTab === 'bookings' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-200'
                    }
                  `}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Bookings
                </button>
                
                <button 
                  onClick={() => setActiveTab('messages')}
                  className={`
                    px-4 py-2 rounded-md flex items-center
                    ${activeTab === 'messages' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-200'
                    }
                  `}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              {/* Mobile Content */}
              <div className="lg:hidden">
                {activeTab === 'profile' && renderProfile()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'bookings' && renderBookings()}
                {activeTab === 'messages' && renderMessages()}
              </div>
              
              {/* Desktop Content - always visible */}
              <div className="hidden lg:block space-y-6">
                {renderProfile()}
                {renderOrders()}
                {renderBookings()}
                {renderMessages()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;