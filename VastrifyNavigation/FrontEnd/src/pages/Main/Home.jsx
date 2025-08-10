import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full text-center py-16 px-4 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
            Welcome, <span className="text-yellow-400">{user?.name}</span> 👋
          </h1>
          <p className="text-lg text-gray-200 mb-8 animate-fadeIn delay-200">
            Step into style. Explore our latest collections crafted just for you.
          </p>
          <Link
            to="/women"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transform transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
        
        {/* Men's Collection */}
        <Link
          to="/men"
          className="group relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition"
        >
          <img
            src="https://images.unsplash.com/photo-1514996937319-344454492b37"
            alt="Men's Collection"
            className="w-full h-72 object-cover group-hover:opacity-80 transition duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <span className="text-3xl font-bold text-white group-hover:text-yellow-400 transition">
              Men
            </span>
          </div>
        </Link>

        {/* Women's Collection */}
        <Link
          to="/women"
          className="group relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition"
        >
          <img
            src="https://images.unsplash.com/photo-1520975918318-3cc88fdbe6b8"
            alt="Women's Collection"
            className="w-full h-72 object-cover group-hover:opacity-80 transition duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <span className="text-3xl font-bold text-white group-hover:text-pink-400 transition">
              Women
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}

export default Home;
