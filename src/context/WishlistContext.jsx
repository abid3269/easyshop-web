import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const addToWishlist = (product) => {
    if (!user) return false;
    
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems((prev) => [...prev, product]);
      return true;
    }
    return false;
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
