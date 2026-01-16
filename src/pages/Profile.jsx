import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import { Package, Loader2 } from 'lucide-react';
import { fetchOrders } from '../lib/api';

const Profile = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      const loadOrders = async () => {
        try {
          const data = await fetchOrders();
          setOrders(data);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadOrders();
    }
  }, [user, isAuthLoading, navigate]);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProfileSidebar activeTab="profile" />
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
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="animate-spin text-blue-600" size={24} />
                  </div>
                ) : (
                  orders.slice(0, 3).map((order) => (
                    <Link
                      key={order.id}
                      to={`/profile/orders/${order.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
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
                    </Link>
                  ))
                )}
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
