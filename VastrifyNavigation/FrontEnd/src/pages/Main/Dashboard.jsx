import { useEffect, useState } from "react";
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

  const sections = [
    { title: "Pending Orders", status: "Pending", action: "Mark as Ready" },
    { title: "Ready Orders", status: "Ready" },
    { title: "Completed Orders", status: "Received" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

      {sections.map(({ title, status, action }) => {
        const filteredOrders = orders.filter((o) => o.status === status);

        return (
          <section key={status} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>

            {filteredOrders.length === 0 ? (
              <p className="text-gray-600">No {title.toLowerCase()}</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
                  >
                    <p className="font-semibold text-gray-700 mb-1">
                      User:{" "}
                      <span className="font-normal">
                        {order.user?.name} ({order.user?.email})
                      </span>
                    </p>
                    <p className="font-semibold text-gray-700 mb-1">
                      Product:{" "}
                      <span className="font-normal">{order.item?.name}</span>
                    </p>
                    <p className="font-semibold text-gray-700 mb-1">
                      Price:{" "}
                      <span className="font-normal">₹{order.item?.price}</span>
                    </p>
                    <p className="font-semibold text-gray-700 mb-1">
                      Quantity: <span className="font-normal">{order.quantity}</span>
                    </p>
                    <p className="font-semibold text-gray-700 mb-1">
                      Total Amount:{" "}
                      <span className="font-normal">₹{order.totalAmount}</span>
                    </p>
                    {order.paymentMethod && (
                      <p className="font-semibold text-gray-700 mb-1">
                        Payment Method:{" "}
                        <span className="font-normal">{order.paymentMethod}</span>
                      </p>
                    )}
                    {typeof order.isPaid === "boolean" && (
                      <p className="font-semibold text-gray-700 mb-1">
                        Paid: <span className="font-normal">{order.isPaid ? "Yes" : "No"}</span>
                      </p>
                    )}
                    {order.location && (
                      <p className="font-semibold text-gray-700 mb-1">
                        Location: <span className="font-normal">{order.location}</span>
                      </p>
                    )}
                    <p className="font-semibold text-gray-700 mb-4">
                      Status: <span className="font-normal">{order.status}</span>
                    </p>

                    {action && (
                      <button
                        onClick={() => updateStatus(order._id, "Ready")}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md shadow-md transition"
                      >
                        {action}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default Dashboard;
