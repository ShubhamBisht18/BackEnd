import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [seatNumber, setSeatNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleOrder = async () => {
    try {
      const payload = {
        seatNumber,
        items: cartItems.map(item => ({
          foodId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: calculateTotal(),
        paymentMethod
      };
      await axios.post('/order/place', payload);
      alert("Order placed successfully!");
      navigate("/myorder");
    } catch (err) {
      alert("Error placing order");
    }
  };

  return (
    <div>
      <h3>Cart Items</h3>
      {cartItems.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.name} width="150" />
          <p><strong>{item.name}</strong></p>
          <p>Quantity: {item.quantity}</p>
          <p>Total: ₹{item.price * item.quantity}</p>
        </div>
      ))}

      <div>
        <label>Seat Number: </label>
        <input
          type="text"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          placeholder="Enter seat number"
        />
      </div>

      <div>
        <label>Payment Method: </label>
        <label>
          <input
            type="radio"
            value="Online"
            checked={paymentMethod === "Online"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          /> Online
        </label>
        <label>
          <input
            type="radio"
            value="Cash On Delivery"
            checked={paymentMethod === "Cash On Delivery"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          /> Cash On Delivery
        </label>
      </div>

      <h3>Grand Total: ₹{calculateTotal()}</h3>
      <button onClick={handleOrder}>Order</button>
    </div>
  );
}

export default Cart;

