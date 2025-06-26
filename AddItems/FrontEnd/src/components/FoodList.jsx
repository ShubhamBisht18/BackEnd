import React, { useEffect, useState } from "react";
import instance from "../axios";
import { useNavigate } from 'react-router-dom'


function FoodList() {

  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    instance.get('/api/food/foodlist')
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
    setQty((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const DecQty = (id) => {
    setQty((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const handleAddToCart = () => {
    const selectedItems = foods.filter(food => qty[food._id] > 0)
      .map((food) => ({
        ...food,
        quantity: qty[food._id]
      }))
    navigate('/cart', { state: { cartItems: selectedItems } })
  }

  return (
    <div>
      <h3>Food List</h3>
      <div>
        {foods.map((food) => (
          <div key={food._id}>
            <img src={food.image} alt={food.name} width="150" />
            <p><strong>{food.name}</strong></p>
            <p>₹{food.price}</p>
            <div>
              <button onClick={() => IncQty(food._id)}>+</button>
              <input type="text" value={qty[food._id]} readOnly />
              <button onClick={() => DecQty(food._id)}>-</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default FoodList;
