import type { Product } from "../types/productType";
import { useEffect, useState } from "react";
import axios from "axios";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        if (!cancel) {
          setProducts(response.data);
          setError(null);
        }
      } catch (err: any) {
        if (!cancel) {
          setError("Failed to fetch products");
        }
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancel = true;
    };
  }, []);

  return { products, loading, error };
}
