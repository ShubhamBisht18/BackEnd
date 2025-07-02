import React, { useEffect, useState } from "react";
import axios from "../axios";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/order/all').then(res => setOrders(res.data)).catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/order/${id}/status`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  const pending = orders.filter(o => o.status === 'Pending');
  const ready = orders.filter(o => o.status === 'Ready');
  const received = orders.filter(o => o.status === 'Received');

  return (
    <div>
      <h2>Pending Orders</h2>
      {pending.map(order => (
        <div key={order._id} style={{ border: '1px solid', padding: 10, margin: 10 }}>
          <p><strong>User:</strong> {order.user.name} ({order.user.email})</p>
          <p><strong>Seat:</strong> {order.seatNumber}</p>
          <p><strong>Method:</strong> {order.paymentMethod} - {order.isPaid ? "Paid" : "Unpaid"}</p>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>{item.name} - {item.quantity} × ₹{item.price}</li>
            ))}
          </ul>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <button onClick={() => updateStatus(order._id, 'Ready')}>Mark as Ready</button>
        </div>
      ))}

      <h2>Ready Orders</h2>
      {ready.map(order => (
        <div key={order._id} style={{ border: '1px solid', padding: 10, margin: 10 }}>
          <p><strong>User:</strong> {order.user.name} ({order.user.email})</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Status:</strong> Ready</p>
        </div>
      ))}

      <h2>Completed Orders</h2>
      {received.map(order => (
        <div key={order._id} style={{ border: '1px solid', padding: 10, margin: 10 }}>
          <p><strong>User:</strong> {order.user.name}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Status:</strong> Received</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
