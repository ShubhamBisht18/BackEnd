import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/my-order">My Orders</Link></li>

        {/* Admin Links */}
        {user?.role === 'admin' && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-item">Add Item</Link></li>
          </>
        )}

        {/* Settings Dropdown */}
        <li onMouseEnter={() => setShowSettings(true)} onMouseLeave={() => setShowSettings(false)}>
          <span>Settings ⏷</span>
          {showSettings && (
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
