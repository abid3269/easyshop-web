import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import { Package, ChevronRight } from 'lucide-react';

const MyOrders = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [orders] = useState(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Sort by date descending
    return storedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/signin');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProfileSidebar activeTab="orders" />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Order History</h2>
            </div>

            {orders.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Order Placed</p>
                        <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order #</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-4 overflow-hidden">
                        {order.items.slice(0, 4).map((item, index) => (
                          <img
                            key={index}
                            className="inline-block h-16 w-16 rounded-md ring-2 ring-white object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        ))}
                        {order.items.length > 4 && (
                          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-100 text-xs font-medium text-gray-500 ring-2 ring-white">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {order.items.map(item => item.name).join(', ')}
                        </p>
                      </div>
                      <Link
                        to={`/order-confirmation/${order.id}`}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Details
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="text-gray-600 mb-6">Looks like you haven't placed any orders yet.</p>
                <Link
                  to="/products"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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

export default MyOrders;
