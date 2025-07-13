import React, { useState } from "react";
import axios from "axios";

const products = [
  { id: 1, name: "T-Shirt", price: 500 },
  { id: 2, name: "Shoes", price: 1500 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/create-order", {
      amount: getTotal(),
    });

    const options = {
      key: "rzp_test_syOoac5WNRABOY", // ✅ Replace with your Razorpay Key ID
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "PaymentSystem",
      description: "Test Transaction",
      handler: function (response) {
        alert("Payment Successful!");
        setCart([]);
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 PaymentSystem</h1>
      <h2>Products</h2>
      {products.map((item) => (
        <div key={item.id}>
          {item.name} - ₹{item.price} {" "}
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}

      <h2>🛂 Cart</h2>
      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - ₹{item.price}
        </div>
      ))}

      <h3>Total: ₹{getTotal()}</h3>

      {cart.length > 0 && (
        <button onClick={handlePayment}>Pay Now</button>
      )}
    </div>
  );
}

export default App;