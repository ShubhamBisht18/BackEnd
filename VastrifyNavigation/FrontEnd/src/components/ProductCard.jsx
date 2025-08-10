import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-48">
      
      {/* Image */}
      <div className="relative h-36">
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-full object-cover group-hover:opacity-90 transition"
        />
        <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          NEW
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-sm font-semibold text-gray-800 truncate">
          {product.name}
        </h4>
        <p className="text-base font-bold text-gray-900">₹{product.price}</p>
        
        {/* Button */}
        <button
          onClick={() => navigate(`/cart/${product._id}`)}
          className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xs py-1 rounded-md font-semibold transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
