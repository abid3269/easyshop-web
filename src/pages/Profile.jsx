import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Package, MapPin, Heart, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="bg-blue-100 rounded-full p-3">
                <User size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
              >
                <User size={20} />
                Profile Info
              </Link>
              <Link
                to="/profile/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <Package size={20} />
                My Orders
              </Link>
              <Link
                to="/profile/addresses"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <MapPin size={20} />
                Addresses
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <Heart size={20} />
                Wishlist
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link to="/profile/orders" className="text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{order.id}</span>
                      <span className="text-sm text-blue-600">{order.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{new Date(order.date).toLocaleDateString()}</p>
                      <p className="font-semibold text-gray-900 mt-1">
                        Total: ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">No orders yet</p>
                <Link
                  to="/products"
                  className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
