// import React from "react";
// import instance from "../axios";
// import { useState, useEffect } from "react";


// function FoodList() {

//     const [foods, setFoods] = useState([])
//     const [qty, setQty] = useState({})

//     useEffect(() => {
//         instance.get('/api/food/foodlist')
//             .then((res) => {
//                 setFoods(res.data)
//                 const foodArray = Array.isArray(res.data) ? res.data : res.data.data;
//                 setFoods(foodArray);
//                 const initialQty = {};
//                 foodArray.forEach(food => {
//                     initialQty[food._id] = 1;
//                 });
//                 setQty(initialQty);
//             })
//             .catch((err) => {
//                 console.error("Error fetching food list", err);
//             });
//     }, [])

//     const IncQty = (id) => {
//         setQty((prev) => ({ ...prev, [id]: prev[id] + 1 }))
//     }
//     const DecQty = (id) => {
//         setQty((prev) => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }))
//     }

//     return (
//         <div>
//             <h3>Food List</h3>
//             <div>
//                 {foods.map((food) => (
//                     <div>
//                         <img src={food.image} alt={food.name} width="150" />
//                         <p><strong>{food.name}</strong></p>
//                         <p>₹{food.price}</p>
//                         <div>
//                             <button onClick={() => IncQty(food._id)}>+</button>
//                             <input type="text" value={qty[food._id]} readOnly />
//                             <button onClick={() => DecQty(food._id)}>-</button>
//                         </div>
//                         <div>
//                             <button>Add to Cart</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default FoodList

import React, { useEffect, useState } from "react";
import instance from "../axios";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    instance.get('/api/food/foodlist')
      .then((res) => {
        const foodArray = Array.isArray(res.data) ? res.data : res.data.data;
        setFoods(foodArray);

        const initialQty = {};
        foodArray.forEach(food => {
          initialQty[food._id] = 1;
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
    setQty((prev) => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

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
            <div>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodList;
