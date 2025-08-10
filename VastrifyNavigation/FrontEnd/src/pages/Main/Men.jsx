import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ProductCard from "../../components/ProductCard";

function Men() {
  const [products, setProducts] = useState([]);
  const categories = ["shirt", "tshirt", "pant", "jeans", "shoes"];

  useEffect(() => {
    axios.get("/products").then((res) => {
      setProducts(res.data.filter((p) => p.gender === "men"));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 sm:px-8 py-8">
      {/* Page Header */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-10">
        Men’s Collection 👔
      </h2>

      {categories.map((cat) => {
        const categoryProducts = products.filter((p) => p.category === cat);
        if (categoryProducts.length === 0) return null;

        return (
          <div key={cat} className="mb-12">
            {/* Category Heading */}
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 border-l-4 border-yellow-400 pl-3 mb-6">
              {cat.toUpperCase()}
            </h3>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {categoryProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Men;
