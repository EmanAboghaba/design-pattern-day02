import { useProducts } from "../hooks/Products";

import type { Product } from "../types/productType";
export default function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg font-medium text-gray-500">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-8 font-semibold">{error}</div>
    );

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Our Products
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="h-56 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain p-4"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-gray-800 text-lg font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-orange-600 font-bold text-lg mt-2">
                  ${product.price}
                </p>
                <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
