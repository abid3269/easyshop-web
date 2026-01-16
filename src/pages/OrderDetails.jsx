import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import { ChevronLeft, Package, Truck, CreditCard, MapPin, Loader2 } from 'lucide-react';
import { fetchOrderById } from '../lib/api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      const loadOrder = async () => {
        try {
          const data = await fetchOrderById(orderId);
          if (data) {
            setOrder(data);
          } else {
            // Handle order not found
          }
        } catch (error) {
          console.error('Failed to fetch order details:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadOrder();
    }
  }, [user, isAuthLoading, navigate, orderId]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!user || !order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <Link to="/profile/orders" className="text-blue-600 flex items-center justify-center gap-2">
          <ChevronLeft size={20} /> Back to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/profile/orders" className="text-blue-600 flex items-center gap-2 hover:underline">
          <ChevronLeft size={20} /> Back to My Orders
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
        </div>
        <div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ProfileSidebar activeTab="orders" />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b flex items-center gap-2">
              <Package className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div key={index} className="p-6 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-blue-600 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-6 border-t space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-blue-600" size={20} />
                <h3 className="font-bold text-gray-900 text-lg">Shipping Address</h3>
              </div>
              <div className="text-gray-700">
                <p className="font-semibold">{order.shippingInfo?.fullName || user.name}</p>
                <p>{order.shippingInfo?.address || 'N/A'}</p>
                <p>{order.shippingInfo?.city}, {order.shippingInfo?.state || ''} {order.shippingInfo?.zipCode}</p>
                <p>{order.shippingInfo?.country}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="text-blue-600" size={20} />
                <h3 className="font-bold text-gray-900 text-lg">Payment Method</h3>
              </div>
              <div className="text-gray-700">
                <p>{order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
                {order.paymentMethod === 'card' && (
                  <p className="text-sm text-gray-500 mt-1">Paid securely</p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex gap-4">
            <Truck className="text-blue-600 shrink-0" size={32} />
            <div>
              <h3 className="font-bold text-blue-900">Delivery Information</h3>
              <p className="text-blue-800 text-sm mt-1">
                {order.status === 'Delivered'
                  ? 'This order has been delivered successfully. Thank you for shopping with us!'
                  : 'Your order is being processed and will be shipped soon. You will receive an email with tracking details.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
