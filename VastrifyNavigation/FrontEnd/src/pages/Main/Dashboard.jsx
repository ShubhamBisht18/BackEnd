import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/orders/${id}/status`, { status });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  const pendingOrders = orders.filter((o) => o.status === "Pending");
  const readyOrders = orders.filter((o) => o.status === "Ready");
  const receivedOrders = orders.filter((o) => o.status === "Received");

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Dashboard</h2>

      {/* Pending Orders */}
      <h3 style={{ marginTop: "1.5rem" }}>Pending Orders</h3>
      {pendingOrders.length === 0 ? (
        <p>No pending orders</p>
      ) : (
        pendingOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid black",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Product:</strong> {order.item?.name}</p>
            <p><strong>Price:</strong> ₹{order.item?.price}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
            <p><strong>Location:</strong> {order.location}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <button onClick={() => updateStatus(order._id, "Ready")}>
              Mark as Ready
            </button>
          </div>
        ))
      )}

      {/* Ready Orders */}
      <h3 style={{ marginTop: "2rem" }}>Ready Orders</h3>
      {readyOrders.length === 0 ? (
        <p>No ready orders</p>
      ) : (
        readyOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid black",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Product:</strong> {order.item?.name}</p>
            <p><strong>Price:</strong> ₹{order.item?.price}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      )}

      {/* Received Orders */}
      <h3 style={{ marginTop: "2rem" }}>Completed Orders</h3>
      {receivedOrders.length === 0 ? (
        <p>No completed orders</p>
      ) : (
        receivedOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid black",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Product:</strong> {order.item?.name}</p>
            <p><strong>Price:</strong> ₹{order.item?.price}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
