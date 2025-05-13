import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../../../../Server/fire"; // Adjust path if needed

const AllProducts = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAndGroup = async () => {
      try {
        const [products, categories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        // Create a map of categoryId => categoryName
        const categoryMap = {};
        categories.forEach((cat) => {
          categoryMap[cat.id] = cat.name;
        });

        // Group products under category names
        const grouped = {};
        products.forEach((product) => {
          const categoryName = categoryMap[product.categoryId] || "Uncategorized";
          if (!grouped[categoryName]) grouped[categoryName] = [];
          grouped[categoryName].push(product);
        });

        setGroupedProducts(grouped);
      } catch (err) {
        console.error("Error loading products or categories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAndGroup();
  }, []);

  return (
    <div className="bg-white text-gray-800 min-h-screen py-10 px-6">

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        Object.entries(groupedProducts).map(([categoryName, products]) => (
          <div key={categoryName} className="mb-12">
            {/* Category Title */}
            <h2 className="text-4xl font-bold text-black mb-6 pl-15 mt-8">{categoryName}</h2>

            {/* Product Cards */}
            <div className="flex flex-wrap justify-left gap-18 pl-25 pb-10">
              {products.map((product) => (
                <div key={product.id} className="w-[350px] text-center">
                  {/* Image Container */}
                  <a
                    href={`/product/${product.id}`}
                    className="bg-gray-100 rounded-lg overflow-hidden h-[290px] flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </a>

                  {/* Name & Description */}
                  <a
                    href={`/product/${product.id}`}
                    className="text-xl font-semibold text-gray-900 block mb-1 "
                  >
                    {product.name}
                  </a>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProducts;