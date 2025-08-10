import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

function Cart() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, checkAuth } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  useEffect(() => {
    axios.get(`/products/${id}`).then(res => setProduct(res.data));
    axios.get(`/review/${id}`).then(res => setReviews(res.data));
  }, [id]);

  const submitReview = async () => {
    try {
      await axios.post(`/review/${id}`, { comment: reviewText, rating });
      setReviewText("");
      setRating(0);
      const res = await axios.get(`/review/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error submitting review", err);
    }
  };

  if (!product) return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const totalPrice = product.price * quantity;

  const handleOrder = async () => {
    if (!location || !paymentMethod) {
      return alert("Please enter delivery location and select payment method.");
    }

    const orderPayload = {
      location,
      item: product._id,
      quantity,
      totalAmount: totalPrice,
      paymentMethod,
    };

    if (paymentMethod === "Cash On Delivery") {
      try {
        await axios.post("/orders/place", orderPayload);
        alert("Order placed successfully!");
        navigate("/my-order");
      } catch (error) {
        alert("Error placing COD order");
      }
    } else {
      try {
        const { data: order } = await axios.post("/payment", {
          amount: totalPrice,
        });

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

        const options = {
          key: razorpayKey,
          amount: order.amount,
          currency: order.currency,
          name: "Vastrify",
          description: "Order Payment",
          order_id: order.id,
          handler: async function (response) {
            const paymentDetails = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyRes = await axios.post("/payment/verify", paymentDetails, {
              withCredentials: true,
            });

            if (verifyRes.data.success) {
              await axios.post("/orders/place", {
                ...orderPayload,
                isPaid: true,
              }, { withCredentials: true });

              await checkAuth();

              if (user) {
                alert("Payment successful & order placed!");
                navigate("/my-order");
              } else {
                alert("Payment succeeded but session expired. Please login.");
                navigate("/login");
              }
            } else {
              alert("Payment verification failed.");
            }
          },
          theme: { color: "#6366f1" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        alert("Online payment failed");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p><span className="font-semibold">Gender:</span> {product.gender}</p>
          <p><span className="font-semibold">Category:</span> {product.category}</p>
          <p className="text-lg font-semibold text-indigo-600">₹{product.price}</p>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
            <span className="font-semibold">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
          </div>

          {/* Location */}
          <input
            type="text"
            placeholder="Enter delivery location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400"
          />

          {/* Payment */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>

          {/* Total Price */}
          <h3 className="text-xl font-bold mt-4">Total: ₹{totalPrice}</h3>

          <button
            onClick={handleOrder}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg shadow-md transition"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Leave a Review</h3>
        <textarea
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your comment..."
          className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex gap-2 my-2">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            >★</span>
          ))}
        </div>
        <button
          onClick={submitReview}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Submit Review
        </button>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
          {reviews.map((rev, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < rev.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                ))}
              </div>
              <p className="mt-2">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
