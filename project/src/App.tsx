import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetail from './pages/products/ProductDetail';
import ServicesPage from './pages/services/ServicesPage';
import ServiceDetail from './pages/services/ServiceDetail';
import ManageService from './pages/services/ManageService';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import RetailerDashboard from './pages/dashboard/RetailerDashboard';
import ProviderDashboard from './pages/dashboard/ProviderDashboard';
import NotFound from './pages/NotFound';

function App() {
  const { user, loading } = useAuth();

  // Show a loading indicator while checking authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetail />} />

        {/* Protected routes */}
        {user && user.role === 'customer' && (
          <Route path="dashboard\" element={<CustomerDashboard />} />
        )}
        
        {user && user.role === 'retailer' && (
          <Route path="dashboard" element={<RetailerDashboard />} />
        )}
        
        {user && user.role === 'provider' && (
          <>
            <Route path="dashboard\" element={<ProviderDashboard />} />
            <Route path="services/manage" element={<ManageService />} />
            <Route path="services/manage/:id" element={<ManageService />} />
          </>
        )}

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;