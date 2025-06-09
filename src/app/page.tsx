'use client';

import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import useProduct from '@/hooks/useProduct';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { products, loading, error } = useProduct();
  const { user } = useAuth();
  const router = useRouter();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) {
    router.push('/login');
  }
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
           <Link
           key={product.id}
           href={`/products/${product.id}`}
           >
            <div key={product.id} className="border p-4 rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="rounded-md object-cover mb-4"
              />

              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600">Rs.{product.price}</p>
            </div>
           </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
