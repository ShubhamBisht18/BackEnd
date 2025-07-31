import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={product.photo} alt={product.name} width="150" />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button onClick={() => navigate(`/cart/${product._id}`)}>Checkout</button>
    </div>
  );
}

export default ProductCard;
