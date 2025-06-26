import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import FoodList from './components/FoodList';
import AddFood from './components/AddFood';
import Cart from './components/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FoodList />} />
        <Route path="addfood" element={<AddFood />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
