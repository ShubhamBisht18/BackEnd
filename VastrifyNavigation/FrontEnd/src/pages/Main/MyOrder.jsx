import { useEffect, useState } from "react";
import axios from "../../utils/axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/orders/my-orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);

  const markAsReceived = async (id) => {
    try {
      await axios.put(`/orders/${id}/status`, { status: "Received" });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "Received" } : order
        )
      );
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} style={{ border: "1px solid black", margin: "1rem", padding: "1rem" }}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Product:</strong> {order.item?.name || "N/A"}</p>
              <p><strong>Price:</strong> ₹{order.item?.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Location:</strong> {order.location}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> {order.status}</p>

              {order.status === "Ready" && (
                <button onClick={() => markAsReceived(order._id)}>
                  Mark as Received
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
