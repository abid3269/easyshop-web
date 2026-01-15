import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useState } from 'react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            EasyShop
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="hidden md:flex items-center relative">
              <Heart size={24} className="text-gray-700 hover:text-red-500 transition" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="flex items-center relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-blue-600 transition" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:block relative group">
                <button className="flex items-center space-x-2">
                  <User size={24} className="text-gray-700" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/profile/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Link to="/wishlist" className="block py-2">
              Wishlist ({wishlistItems.length})
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="block py-2">
                  My Profile
                </Link>
                <Link to="/profile/orders" className="block py-2">
                  My Orders
                </Link>
                <button onClick={signOut} className="block py-2 text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/signin" className="block py-2">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
