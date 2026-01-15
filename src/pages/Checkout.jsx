import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Truck, Package } from 'lucide-react';

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Shipping validation
    if (!shippingInfo.fullName) newErrors.fullName = 'Full name is required';
    if (!shippingInfo.email) newErrors.email = 'Email is required';
    if (!shippingInfo.phone) newErrors.phone = 'Phone is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.zipCode) newErrors.zipCode = 'Zip code is required';

    // Payment validation for card
    if (paymentMethod === 'card') {
      if (!cardInfo.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!cardInfo.cardName) newErrors.cardName = 'Card name is required';
      if (!cardInfo.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!cardInfo.cvv) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Mock order placement
    const orderId = `ORD-${Date.now()}`;
    const order = {
      id: orderId,
      items: cartItems,
      total,
      shippingInfo,
      paymentMethod,
      date: new Date().toISOString(),
      status: 'Processing',
    };

    // Save to localStorage (mock)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, email: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, phone: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, address: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, city: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, state: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip / Postal Code *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.country}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, country: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cardNumber}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                        }
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cardName}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, cardName: e.target.value })
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardName && (
                        <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.expiryDate}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, expiryDate: e.target.value })
                        }
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        placeholder="123"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cvv && (
                        <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-6">
                <Package className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
