import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import FoodList from './components/FoodList';
import AddFood from './components/AddFood';

function App() {
  return (
    <Routes>
      {/* Shared layout route */}
      <Route path="/" element={<Layout />}>
        {/* Default child route when path is exactly "/" */}
        <Route index element={<FoodList />} />

        {/* Shown when path is "/addfood" */}
        <Route path="addfood" element={<AddFood />} />
      </Route>
    </Routes>
  );
}

export default App;
