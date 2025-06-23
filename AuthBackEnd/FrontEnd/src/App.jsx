import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from './axios'

import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'


function App() {

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/user', { withCredentials: true })
      .then(() => navigate('/profile'))   // already logged in
      .catch(() => navigate('/login')); // not logged in
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
