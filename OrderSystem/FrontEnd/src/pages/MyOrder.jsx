import React, { useEffect, useState } from 'react';
import axios from '../axios';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/order/mine').then(res => setOrders(res.data)).catch(console.error);
  }, []);

  const markAsReceived = async (id) => {
    try {
      await axios.put(`/order/${id}/status`, { status: 'Received' });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: 'Received' } : o));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid', margin: 10, padding: 10 }}>
          <p><strong>Seat:</strong> {order.seatNumber}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>
          {order.status === 'Ready' && <button onClick={() => markAsReceived(order._id)}>Order Received</button>}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;