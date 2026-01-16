import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react';

const ProfileSidebar = ({ activeTab }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  if (!user) return null;

  const navItems = [
    { id: 'profile', label: 'Profile Info', icon: User, path: '/profile' },
    { id: 'orders', label: 'My Orders', icon: Package, path: '/profile/orders' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/profile/addresses' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-4 mb-6 pb-6 border-b">
        <div className="bg-blue-100 rounded-full p-3">
          <User size={32} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600 truncate max-w-[150px] md:max-w-full">{user.email}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
