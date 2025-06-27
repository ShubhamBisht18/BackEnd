import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from './axios'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import AboutUs from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddFood from './pages/AddFood.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminOnly from './pages/AdminOnly.jsx'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/auth/me')
      .then(res => {
        setUser(res.data)
      })
      .catch(() => {
        setUser(null)
        navigate('/login')
      })
  }, [])

  if (!user) return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
    </Routes>
  )

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dashboard" element={user.role === 'admin' ? <Dashboard /> : <AdminOnly />} />
        <Route path="/addfood" element={user.role === 'admin' ? <AddFood /> : <AdminOnly />} />
      </Routes>
    </>
  )
}

export default App
