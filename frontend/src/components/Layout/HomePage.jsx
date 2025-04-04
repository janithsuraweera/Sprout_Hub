import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function HomePage() {
  return (
    <div className="font-sans">
      {/* Hero Section (Full Width) */}
      <header className="bg-gradient-to-r from-green-400 to-green-600 text-white text-center py-32 w-full">
        <div className="w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">SproutHub: Your Fresh Farm</h1>
          <p className="text-xl md:text-2xl mb-10">Direct connection between farmers and consumers.</p>
          <div className="flex justify-center">
            <button className="bg-white text-green-600 font-semibold py-4 px-12 rounded-full hover:bg-green-100 transition duration-300">
              Explore Fresh Products
            </button>
          </div>
        </div>
      </header>

      {/* Featured Products Section (Full Width) */}
      <section className="bg-gray-100 py-24 w-full">
        <div className="w-full">
          <h2 className="text-4xl font-semibold mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Product Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src="/images/tomato.jpg" alt="Fresh Tomatoes" className="w-full h-64 object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">Fresh Tomatoes</h3>
                <p className="text-gray-600 mb-5">Ripe tomatoes from local farms.</p>
                <a href="/products/1" className="text-green-600 font-semibold hover:underline">View Details</a>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src="/images/rice.jpg" alt="Organic Rice" className="w-full h-64 object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">Organic Rice</h3>
                <p className="text-gray-600 mb-5">Premium chemical-free organic rice.</p>
                <a href="/products/2" className="text-green-600 font-semibold hover:underline">View Details</a>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src="/images/mango.jpg" alt="Organic Mango" className="w-full h-64 object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">Organic Mango</h3>
                <p className="text-gray-600 mb-5">Premium chemical-free organic mango.</p>
                <a href="/products/3" className="text-green-600 font-semibold hover:underline">View Details</a>
              </div>
            </div>
            {/* More products */}
          </div>
        </div>
      </section>

      {/* Categories Section (Full Width) */}
      <section className="bg-green-50 py-24 w-full">
        <div className="w-full">
          <h2 className="text-4xl font-semibold mb-12 text-center">Explore Categories</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/categories/vegetables" className="bg-white text-green-600 font-semibold py-3 px-8 rounded-full hover:bg-green-100 transition duration-300">Vegetables</a>
            <a href="/categories/fruits" className="bg-white text-green-600 font-semibold py-3 px-8 rounded-full hover:bg-green-100 transition duration-300">Fruits</a>
            <a href="/categories/grains" className="bg-white text-green-600 font-semibold py-3 px-8 rounded-full hover:bg-green-100 transition duration-300">Grains</a>
            {/* More categories */}
          </div>
        </div>
      </section>

      {/* Call to Action Section (Full Width) */}
      <section className="bg-green-100 py-24 w-full">
        <div className="w-full text-center">
          <h2 className="text-4xl font-semibold mb-8">Join SproutHub Today!</h2>
          <p className="text-xl mb-10">Discover fresh products and support local farmers.</p>
          <div className="flex justify-center">
            <Link to="/register" className="bg-green-600 text-white font-semibold py-4 px-12 rounded-full hover:bg-green-700 transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;