import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import { 
  User, 
  Calendar, 
  BarChart2, 
  MessageSquare, 
  MapPin,
  Edit,
  Plus,
  Trash,
  Scissors,
  Check,
  X,
  Clock
} from 'lucide-react';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  const renderProfile = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">Provider Profile</h2>
        
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
                Business Name
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

  const renderServices = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-heading">My Services</h2>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New Service
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg" 
                        alt="Service" 
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        Professional Hair Styling
                      </div>
                      <div className="text-sm text-neutral-500">
                        Beauty & Personal Care
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">$30.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">60 mins</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    4.8
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 space-x-3">
                  <button className="text-primary-600 hover:text-primary-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-error-600 hover:text-error-800">
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/3298637/pexels-photo-3298637.jpeg" 
                        alt="Service" 
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        Traditional Cooking Classes
                      </div>
                      <div className="text-sm text-neutral-500">
                        Education
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">$40.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">180 mins</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    4.9
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 space-x-3">
                  <button className="text-primary-600 hover:text-primary-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-error-600 hover:text-error-800">
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderBookings = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">Upcoming Bookings</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">John Doe</div>
                  <div className="text-xs text-neutral-500">customer@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">Professional Hair Styling</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">June 10, 2023</div>
                  <div className="text-xs text-neutral-500">10:00 AM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-100 text-accent-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button className="text-success-600 hover:text-success-800 border border-success-600 rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </button>
                  <button className="text-error-600 hover:text-error-800 border border-error-600 rounded-full p-1">
                    <X className="w-3 h-3" />
                  </button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">John Doe</div>
                  <div className="text-xs text-neutral-500">customer@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">Traditional Cooking Classes</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">June 15, 2023</div>
                  <div className="text-xs text-neutral-500">2:00 PM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  <button className="text-primary-600 hover:text-primary-800 font-medium">
                    Reschedule
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-primary-800">Total Revenue</h3>
              <Scissors className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-3xl font-bold text-primary-900">$70.00</p>
            <p className="text-sm text-primary-700 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-secondary-800">Bookings</h3>
              <Calendar className="w-8 h-8 text-secondary-500" />
            </div>
            <p className="text-3xl font-bold text-secondary-900">2</p>
            <p className="text-sm text-secondary-700 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-6 border border-accent-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-accent-800">Avg. Rating</h3>
              <Star className="w-8 h-8 text-accent-500" />
            </div>
            <p className="text-3xl font-bold text-accent-900">4.9</p>
            <p className="text-sm text-accent-700 mt-1">From 2 reviews</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="font-medium text-lg mb-4">Booking Overview</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-neutral-300 rounded-lg">
            <p className="text-neutral-500">Booking chart will be displayed here</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-6">
      <div className="container">
        <h1 className="text-2xl font-bold font-heading mb-6">
          Service Provider Dashboard
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
                  onClick={() => setActiveTab('services')}
                  className={`
                    px-4 py-2 rounded-md flex items-center
                    ${activeTab === 'services' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-200'
                    }
                  `}
                >
                  <Scissors className="w-4 h-4 mr-2" />
                  Services
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
                  onClick={() => setActiveTab('analytics')}
                  className={`
                    px-4 py-2 rounded-md flex items-center
                    ${activeTab === 'analytics' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-200'
                    }
                  `}
                >
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Analytics
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              {/* Mobile Content */}
              <div className="lg:hidden">
                {activeTab === 'profile' && renderProfile()}
                {activeTab === 'services' && renderServices()}
                {activeTab === 'bookings' && renderBookings()}
                {activeTab === 'analytics' && renderAnalytics()}
              </div>
              
              {/* Desktop Content - always visible */}
              <div className="hidden lg:block space-y-6">
                {renderProfile()}
                {renderServices()}
                {renderBookings()}
                {renderAnalytics()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;