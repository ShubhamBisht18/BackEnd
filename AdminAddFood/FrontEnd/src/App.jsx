import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Layout from './Layout'
import axios from './axios'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Menu from './pages/Menu'
import AddFood from './pages/AddFood'
import Dashboard from './pages/Dashboard'
import AdminOnly from './pages/AdminOnly'
import Cart from './pages/Cart'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(()=>{
    axios.get('/auth/me')
    .then((res)=> setUser(res.data.user))
    .catch(()=>{
      setUser(null)
      navigate('/login')
    })
  },[])

  if(!user){
    return(
      <Routes>
        <Route path='/register' element={<Register setUser={setUser} />}/>
        <Route path='/login' element={<Login setUser={setUser} />}/>
      </Routes>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout user={user} setUser={setUser} />}>
        <Route index element={<Home/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='menu' element={<Menu/>}/>
        <Route path='addfood' element={user?.role === 'admin'?<AddFood/>:<AdminOnly/>}/>
        <Route path='dashboard' element={user?.role === 'admin'?<Dashboard/>:<AdminOnly/>}/>
        <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
