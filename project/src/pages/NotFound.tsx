import { Link } from 'react-router-dom';
import { Store, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center">
          <Store className="h-16 w-16 text-primary-500" />
        </div>
        <h1 className="mt-6 text-5xl font-bold font-heading text-neutral-900">
          404
        </h1>
        <h2 className="mt-2 text-3xl font-bold font-heading text-neutral-800">
          Page Not Found
        </h2>
        <p className="mt-4 text-xl text-neutral-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10">
          <Link 
            to="/"
            className="btn-primary flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;