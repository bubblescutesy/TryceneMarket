import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Package, 
  Calendar, 
  MessageSquare, 
  BarChart2,
  Heart,
  Settings,
  ShoppingBag,
  Store,
  Scissors
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarLink = ({ to, icon, label, active }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-neutral-600 hover:bg-neutral-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  if (!user) return null;

  // Define sidebar links based on user role
  let links = [];

  const baseLinks = [
    {
      to: '/dashboard',
      icon: <User className="w-5 h-5" />,
      label: 'My Profile'
    },
    {
      to: '/dashboard/messages',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Messages'
    },
    {
      to: '/dashboard/settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings'
    }
  ];

  if (user.role === 'customer') {
    links = [
      ...baseLinks,
      {
        to: '/dashboard/orders',
        icon: <Package className="w-5 h-5" />,
        label: 'My Orders'
      },
      {
        to: '/dashboard/bookings',
        icon: <Calendar className="w-5 h-5" />,
        label: 'My Bookings'
      },
      {
        to: '/dashboard/favorites',
        icon: <Heart className="w-5 h-5" />,
        label: 'Favorites'
      }
    ];
  } else if (user.role === 'retailer') {
    links = [
      ...baseLinks,
      {
        to: '/dashboard/products',
        icon: <ShoppingBag className="w-5 h-5" />,
        label: 'My Products'
      },
      {
        to: '/dashboard/store',
        icon: <Store className="w-5 h-5" />,
        label: 'Store Management'
      },
      {
        to: '/dashboard/orders',
        icon: <Package className="w-5 h-5" />,
        label: 'Orders'
      },
      {
        to: '/dashboard/analytics',
        icon: <BarChart2 className="w-5 h-5" />,
        label: 'Analytics'
      }
    ];
  } else if (user.role === 'provider') {
    links = [
      ...baseLinks,
      {
        to: '/dashboard/services',
        icon: <Scissors className="w-5 h-5" />,
        label: 'My Services'
      },
      {
        to: '/dashboard/bookings',
        icon: <Calendar className="w-5 h-5" />,
        label: 'Bookings'
      },
      {
        to: '/dashboard/analytics',
        icon: <BarChart2 className="w-5 h-5" />,
        label: 'Analytics'
      }
    ];
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-full h-full text-neutral-500 bg-neutral-200 p-1" />
          )}
        </div>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-neutral-500 capitalize">{user.role}</p>
        </div>
      </div>

      <nav className="space-y-1">
        {links.map((link, index) => (
          <SidebarLink
            key={index}
            to={link.to}
            icon={link.icon}
            label={link.label}
            active={link.to === currentPath || (link.to !== '/dashboard' && currentPath.startsWith(link.to))}
          />
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;