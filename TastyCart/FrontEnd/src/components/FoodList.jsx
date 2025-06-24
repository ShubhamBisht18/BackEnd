import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/food')
      .then(res => {
        setFoods(res.data);
        const initialQty = {};
        res.data.forEach(f => initialQty[f._id] = 1);
        setQty(initialQty);
      });
  }, []);

  const changeQty = (id, delta) => {
    setQty(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  return (
    <div>
      <h1>Food List</h1>
      {foods.map(food => (
        <div key={food._id} style={{ border: '1px solid', padding: '10px', margin: '10px' }}>
          <img src={food.image} alt={food.name} width="100" />
          <h3>{food.name}</h3>
          <p>Price: ₹{food.price}</p>
          <div>
            <button onClick={() => changeQty(food._id, -1)}>-</button>
            <input value={qty[food._id] || 1} readOnly />
            <button onClick={() => changeQty(food._id, 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

