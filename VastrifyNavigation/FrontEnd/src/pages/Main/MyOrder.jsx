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
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-8 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <p className="font-semibold text-gray-700 break-words">
                  <span className="text-gray-500">Order ID:</span> {order._id}
                </p>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "Ready"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {order.status}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-semibold">Product:</span> {order.item?.name || "N/A"}</p>
                <p><span className="font-semibold">Price:</span> ₹{order.item?.price}</p>
                <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                <p><span className="font-semibold">Total Amount:</span> ₹{order.totalAmount}</p>
                <p><span className="font-semibold">Location:</span> {order.location}</p>
                <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
              </div>

              {order.status === "Ready" && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => markAsReceived(order._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-md transition"
                  >
                    Mark as Received
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
