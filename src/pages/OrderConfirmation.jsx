import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
          </div>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Order Number:</span> {orderId}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{' '}
              <span className="text-blue-600">Processing</span>
            </p>
            <p className="text-sm text-gray-600 mt-4">
              You will receive a confirmation email shortly with order details and tracking
              information.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Truck className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">What's Next?</h3>
          </div>
          <p className="text-gray-700">
            We'll send you tracking information once your order ships. Estimated delivery is
            3-5 business days.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile/orders"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Orders
          </Link>
          <Link
            to="/products"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
