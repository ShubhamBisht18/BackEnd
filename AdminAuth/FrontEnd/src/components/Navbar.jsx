import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/contact">Contact</Link> | 
      <Link to="/about">About</Link> | 
      <Link to="/menu">Menu</Link>
      {user?.role === 'admin' && (
        <>
          {' '}| <Link to="/addfood">Add Food</Link> | <Link to="/dashboard">Dashboard</Link>
        </>
      )}
      {' '}| <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;