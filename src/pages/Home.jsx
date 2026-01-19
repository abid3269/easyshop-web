import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/mockData';
import ProductCard from '../components/products/ProductCard';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await getAccessToken();
        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/api/products`, { headers });
        const data = await response.json();
        console.log('Products from backend:', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [getAccessToken]);

  const flashSaleProducts = products.filter((p) => p.isFlashSale);
  const newArrivals = products.filter((p) => p.isNew);
  const recommendations = products.slice(0, 4);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to EasyShop</h1>
            <p className="text-xl mb-8">
              Discover amazing products at unbeatable prices. Shop now and enjoy great deals!
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 flex items-center">
            View All <ChevronRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sales */}
      {flashSaleProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="text-red-600">⚡</span> Flash Sale
            </h2>
            <Link to="/products?sale=true" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Recommended for You</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 flex items-center">
            View All <ChevronRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="text-green-600">✨</span> New Arrivals
            </h2>
            <Link to="/products?new=true" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-xl mb-6">Get exclusive deals and updates delivered to your inbox</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
