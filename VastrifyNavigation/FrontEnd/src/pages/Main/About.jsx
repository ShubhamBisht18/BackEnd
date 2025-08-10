import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          About <span className="text-blue-600">Vastrify</span>
        </h2>

        {/* Intro Text */}
        <p className="text-lg text-gray-700 text-center mb-10">
          At <span className="font-semibold text-blue-600">Vastrify</span>, we believe that fashion is more than just
          clothing — it’s a statement of who you are. Our mission is to provide
          high-quality, stylish apparel that fits your personality, budget, and lifestyle.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">We use the finest fabrics to ensure lasting comfort and style.</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-pink-600 mb-2">Trendy Designs</h3>
            <p className="text-gray-600 text-sm">Our collections are inspired by global fashion trends.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">We deliver your orders quickly and reliably, nationwide.</p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Promise</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you’re shopping for everyday wear or a special occasion, Vastrify ensures 
            you always look and feel your best. We’re committed to exceptional service, sustainable 
            practices, and making fashion accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

