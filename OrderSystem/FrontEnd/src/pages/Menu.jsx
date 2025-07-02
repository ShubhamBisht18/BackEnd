import React, { useEffect, useState } from "react";
import instance from "../axios";
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    instance.get('/food')
      .then((res) => {
        const foodArray = Array.isArray(res.data) ? res.data : res.data.data;
        setFoods(foodArray);
        const initialQty = {};
        foodArray.forEach(food => {
          initialQty[food._id] = 0;
        });
        setQty(initialQty);
      })
      .catch((err) => {
        console.error("Error fetching food list", err);
      });
  }, []);

  const IncQty = (id) => {
    setQty(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const DecQty = (id) => {
    setQty(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const handleAddToCart = () => {
    const selectedItems = foods.filter(food => qty[food._id] > 0)
      .map(food => ({
        ...food,
        quantity: qty[food._id]
      }));
    navigate('/cart', { state: { cartItems: selectedItems } });
  };

  return (
    <div>
      <h2>Menu</h2>
      {foods.map(food => (
        <div key={food._id} style={{ border: '1px solid', margin: 10, padding: 10 }}>
          <img src={food.image} alt={food.name} width="100" />
          <h4>{food.name}</h4>
          <p>₹{food.price}</p>
          <div>
            <button onClick={() => DecQty(food._id)}>-</button>
            <input value={qty[food._id]} readOnly />
            <button onClick={() => IncQty(food._id)}>+</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Menu;
