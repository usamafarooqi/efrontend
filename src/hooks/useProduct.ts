import { useEffect, useState } from "react";
import apiClient from '@/lib/apiClient';
import { useRouter } from "next/navigation";

interface Product {
  imageUrl: string;
  id: string;
  name: string;
  price: number;
  description: string;
  images?: { url: string }[];
}

export default function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}