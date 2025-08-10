import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Contact <span className="text-blue-600">Us</span>
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Have questions or need assistance? Our team is here to help.
          Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-blue-600">Email</h3>
            <p className="text-gray-600 text-sm">support@vastrify.com</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-pink-600">Phone</h3>
            <p className="text-gray-600 text-sm">+91 98765 43210</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-green-600">Address</h3>
            <p className="text-gray-600 text-sm">Mumbai, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

