import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyPromoCode = (code) => {
    // Mock promo codes
    const promoCodes = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME': 15,
    };

    const discountPercent = promoCodes[code.toUpperCase()];
    if (discountPercent) {
      setPromoCode(code);
      setDiscount(discountPercent);
      return true;
    }
    return false;
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscount(0);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromoCode,
    clearCart,
    promoCode,
    discount,
    subtotal,
    discountAmount,
    total,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
