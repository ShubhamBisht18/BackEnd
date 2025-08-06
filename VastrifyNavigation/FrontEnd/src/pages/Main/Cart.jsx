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

  if (!product) return <p>Loading...</p>;

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
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        alert("Online payment failed");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.name}</h2>
      <img src={product.photo} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p><strong>Gender:</strong> {product.gender}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price (each):</strong> ₹{product.price}</p>

      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(q => q + 1)}>+</button>
      </div>

      <input
        type="text"
        placeholder="Enter delivery location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ marginTop: "1rem", width: "100%", padding: "0.5rem" }}
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ marginTop: "1rem", width: "100%", padding: "0.5rem" }}
      >
        <option value="Cash On Delivery">Cash On Delivery</option>
        <option value="Online">Online Payment</option>
      </select>

      <h3 style={{ marginTop: "1rem" }}>Total: ₹{totalPrice}</h3>

      <button onClick={handleOrder} style={{ marginTop: "1rem" }}>
        Order
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h3>Leave a Review</h3>
        <textarea
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your comment..."
          style={{ width: "100%" }}
        />
        <div>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
                fontSize: "1.5rem",
              }}
            >★</span>
          ))}
        </div>
        <button onClick={submitReview}>Submit Review</button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>All Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <div>
              {"★".repeat(rev.rating)}
              <span style={{ color: "gray" }}>
                {"★".repeat(5 - rev.rating)}
              </span>
            </div>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
