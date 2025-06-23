import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import axios from './axios'

function App() {

  const navigate =  useNavigate();

  useEffect(()=>{
    axios.get('/user',{withCredentials:true})
    .then(()=> navigate('/profile'))
    .catch(()=> navigate('/register'))
  },[])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App
