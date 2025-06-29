import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [seatNumber, setSeatNumber] = useState("");

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h3>Cart Items</h3>
      <div>
        {cartItems.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.name} width="150" />
            <p><strong>{item.name}</strong></p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div>
        <label>Seat Number: </label>
        <input
          type="text"
          placeholder="Enter your seat number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
        />
      </div>

      <h3>Grand Total: ₹{calculateTotal()}</h3>
      <button>Pay</button> {/* No functionality added */}
    </div>
  );
}

export default Cart;
