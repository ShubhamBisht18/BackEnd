import AddFood from './components/AddFood'
import FoodList from './components/FoodList'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div>
      <div>
        <nav><Link to="/add">Add Food</Link></nav>
        <Routes>
          <Route path="/" element={<FoodList />} />
          <Route path="/add" element={<AddFood />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
