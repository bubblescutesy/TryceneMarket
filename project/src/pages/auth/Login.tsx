import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Store, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect URL from location state or default to homepage
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  // Demo account logins
  const demoLogins = [
    { role: 'Customer', email: 'customer@example.com', password: 'password123' },
    { role: 'Retailer', email: 'retailer@example.com', password: 'password123' },
    { role: 'Provider', email: 'provider@example.com', password: 'password123' }
  ];

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    try {
      await login(demoEmail, demoPassword);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Store className="h-12 w-12 text-primary-500" />
          </div>
          <h1 className="mt-4 text-3xl font-bold font-heading text-neutral-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-neutral-600">
            Sign in to access your account
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
              htmlFor="email" 
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
              ) : null}
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-8">
          <p className="text-center text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Demo Account Section */}
        <div className="mt-8 border-t border-neutral-200 pt-6">
          <p className="text-center text-sm text-neutral-600 mb-4">
            Try a demo account
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {demoLogins.map((demo, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(demo.email, demo.password)}
                className="px-3 py-2 text-xs border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
              >
                {demo.role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;