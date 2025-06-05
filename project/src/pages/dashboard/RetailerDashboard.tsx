import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import { 
  User, 
  Package, 
  BarChart2, 
  MessageSquare, 
  MapPin,
  Edit,
  Plus,
  Trash,
  ShoppingBag,
  Upload,
  PlusCircle,
  Store
} from 'lucide-react';

const RetailerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  const renderProfile = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">Store Profile</h2>
        
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
                Store Name
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
                Edit Store Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-heading">My Products</h2>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Inventory
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
                        src="https://images.pexels.com/photos/5379215/pexels-photo-5379215.jpeg" 
                        alt="Product" 
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        Traditional Handwoven Basket
                      </div>
                      <div className="text-sm text-neutral-500">
                        Home & Decor
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">$25.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">12 in stock</div>
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
                        src="https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg" 
                        alt="Product" 
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        Organic Fresh Vegetables Pack
                      </div>
                      <div className="text-sm text-neutral-500">
                        Food & Groceries
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">$15.50</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">20 in stock</div>
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

  const renderOrders = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold font-heading mb-6">Orders</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">#o1</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">John Doe</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">Traditional Handwoven Basket</div>
                  <div className="text-xs text-neutral-500">Qty: 2</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">$51.98</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                    Delivered
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  April 5, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-primary-600 hover:text-primary-800 font-medium">
                    View
                  </button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">#o2</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">John Doe</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">African Print Dress</div>
                  <div className="text-xs text-neutral-500">Qty: 1</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">$45.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-100 text-accent-800">
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  May 10, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-primary-600 hover:text-primary-800 font-medium">
                    View
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
              <h3 className="font-medium text-primary-800">Total Sales</h3>
              <ShoppingBag className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-3xl font-bold text-primary-900">$97.97</p>
            <p className="text-sm text-primary-700 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-secondary-800">Orders</h3>
              <Package className="w-8 h-8 text-secondary-500" />
            </div>
            <p className="text-3xl font-bold text-secondary-900">2</p>
            <p className="text-sm text-secondary-700 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-6 border border-accent-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-accent-800">Products</h3>
              <Store className="w-8 h-8 text-accent-500" />
            </div>
            <p className="text-3xl font-bold text-accent-900">4</p>
            <p className="text-sm text-accent-700 mt-1">Active listings</p>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="font-medium text-lg mb-4">Sales Overview</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-neutral-300 rounded-lg">
            <p className="text-neutral-500">Sales chart will be displayed here</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-6">
      <div className="container">
        <h1 className="text-2xl font-bold font-heading mb-6">
          Retailer Dashboard
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
                  onClick={() => setActiveTab('products')}
                  className={`
                    px-4 py-2 rounded-md flex items-center
                    ${activeTab === 'products' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-700 border border-neutral-200'
                    }
                  `}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Products
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
                {activeTab === 'products' && renderProducts()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'analytics' && renderAnalytics()}
              </div>
              
              {/* Desktop Content - always visible */}
              <div className="hidden lg:block space-y-6">
                {renderProfile()}
                {renderProducts()}
                {renderOrders()}
                {renderAnalytics()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;