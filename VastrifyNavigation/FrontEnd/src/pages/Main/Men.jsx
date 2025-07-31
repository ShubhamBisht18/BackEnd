import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ProductCard from "../../components/ProductCard";

function Men() {
  const [products, setProducts] = useState([]);
  const categories = ["shirt", "tshirt", "pant", "jeans", "shoes"];

  useEffect(() => {
    axios.get("/products").then(res => {
      setProducts(res.data.filter(p => p.gender === "men"));
    });
  }, []);

  return (
    <div>
      <h2>Men's Products</h2>
      {categories.map(cat => (
        <div key={cat}>
          <h3>{cat.toUpperCase()}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {products.filter(p => p.category === cat).map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Men;