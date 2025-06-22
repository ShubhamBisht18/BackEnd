import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'


function App() {

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
