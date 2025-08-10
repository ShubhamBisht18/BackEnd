
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Brand */}
          <div className="flex-shrink-0 font-bold text-xl">Vastrify</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <Link
                to="/home"
                className="hover:text-yellow-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/my-order"
                className="hover:text-yellow-400 transition duration-300"
              >
                My Orders
              </Link>
            </li>
            {user?.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-item"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    Add Item
                  </Link>
                </li>
              </>
            )}

            {/* Settings Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setShowSettings(true)}
              onMouseLeave={() => setShowSettings(false)}
            >
              <span className="cursor-pointer hover:text-yellow-400 transition duration-300">
                Settings ⏷
              </span>
              {showSettings && (
                <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded shadow-lg overflow-hidden z-50">
                  <li>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {showMenu ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/home"
            className="block px-3 py-2 rounded-md text-white hover:bg-yellow-400 hover:text-gray-900"
            onClick={() => setShowMenu(false)}
          >
            Home
          </Link>
          <Link
            to="/my-order"
            className="block px-3 py-2 rounded-md text-white hover:bg-yellow-400 hover:text-gray-900"
            onClick={() => setShowMenu(false)}
          >
            My Orders
          </Link>

          {user?.role === "admin" && (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-white hover:bg-yellow-400 hover:text-gray-900"
                onClick={() => setShowMenu(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/add-item"
                className="block px-3 py-2 rounded-md text-white hover:bg-yellow-400 hover:text-gray-900"
                onClick={() => setShowMenu(false)}
              >
                Add Item
              </Link>
            </>
          )}

          <div className="border-t border-gray-700 mt-2 pt-2">
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-white hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setShowMenu(false)}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-white hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setShowMenu(false)}
            >
              About
            </Link>
            <Link
              to="/logout"
              className="block px-3 py-2 rounded-md text-white hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setShowMenu(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
