// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../../utils/axios";

// function Cart() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     axios.get(`/products/${id}`).then(res => {
//       setProduct(res.data);
//     });
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   const totalPrice = product.price * quantity;

//   const increment = () => setQuantity(qty => qty + 1);
//   const decrement = () => setQuantity(qty => (qty > 1 ? qty - 1 : 1));

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>{product.name}</h2>
//       <img src={product.photo} alt={product.name} width="200" />
//       <p>{product.description}</p>
//       <p><strong>Gender:</strong> {product.gender}</p>
//       <p><strong>Category:</strong> {product.category}</p>
//       <p><strong>Price (each):</strong> ₹{product.price}</p>

//       {/* Quantity Selector */}
//       <div style={{ marginTop: "1rem" }}>
//         <label><strong>Select Quantity:</strong></label>
//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
//           <button onClick={decrement} style={{ padding: "0.3rem 1rem" }}>-</button>
//           <span style={{ minWidth: "30px", textAlign: "center" }}>{quantity}</span>
//           <button onClick={increment} style={{ padding: "0.3rem 1rem" }}>+</button>
//         </div>
//       </div>

//       <h3 style={{ marginTop: "1rem" }}>Total: ₹{totalPrice}</h3>

//       <button style={{ marginTop: "1rem" }}>
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// }

// export default Cart;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

function Cart() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/products/${id}`).then(res => {
      setProduct(res.data);
    });
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

      <h3 style={{ marginTop: "1rem" }}>Total: ₹{totalPrice}</h3>

      <button style={{ marginTop: "1rem" }}>
        Proceed to Checkout
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
            <div>{"★".repeat(rev.rating)}<span style={{ color: "gray" }}>{"★".repeat(5 - rev.rating)}</span></div>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;

