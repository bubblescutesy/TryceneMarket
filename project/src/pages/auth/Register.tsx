import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../context/AuthContext';
import { Store, AlertCircle, User, Store as StoreIcon, Calendar } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validation
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      await register(name, email, password, role, location);
      navigate('/');
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <Store className="h-12 w-12 text-primary-500" />
          </div>
          <h1 className="mt-4 text-3xl font-bold font-heading text-neutral-900">
            Create Your Account
          </h1>
          <p className="mt-2 text-neutral-600">
            Join our community marketplace
          </p>
        </div>

        {(error || errorMessage) && (
          <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error || errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Password *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Create a password"
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-neutral-500">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="location" 
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              placeholder="e.g., Harare, Zimbabwe"
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium text-neutral-700 mb-3"
            >
              I want to join as: *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className={`
                flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors
                ${role === 'customer' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-neutral-300 hover:bg-neutral-50'}
              `}>
                <input 
                  type="radio" 
                  name="role" 
                  value="customer" 
                  checked={role === 'customer'} 
                  onChange={() => setRole('customer')} 
                  className="sr-only" 
                />
                <User className="w-8 h-8 mb-3" />
                <span className="font-medium">Customer</span>
                <span className="text-xs text-center mt-1">
                  I want to buy products and book services
                </span>
              </label>

              <label className={`
                flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors
                ${role === 'retailer' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-neutral-300 hover:bg-neutral-50'}
              `}>
                <input 
                  type="radio" 
                  name="role" 
                  value="retailer" 
                  checked={role === 'retailer'} 
                  onChange={() => setRole('retailer')} 
                  className="sr-only" 
                />
                <StoreIcon className="w-8 h-8 mb-3" />
                <span className="font-medium">Retailer</span>
                <span className="text-xs text-center mt-1">
                  I want to sell products online
                </span>
              </label>

              <label className={`
                flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors
                ${role === 'provider' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-neutral-300 hover:bg-neutral-50'}
              `}>
                <input 
                  type="radio" 
                  name="role" 
                  value="provider" 
                  checked={role === 'provider'} 
                  onChange={() => setRole('provider')} 
                  className="sr-only" 
                />
                <Calendar className="w-8 h-8 mb-3" />
                <span className="font-medium">Service Provider</span>
                <span className="text-xs text-center mt-1">
                  I want to offer services to clients
                </span>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
              ) : null}
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;