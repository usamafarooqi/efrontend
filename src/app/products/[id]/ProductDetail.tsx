'use client';

import Header from "@/components/Header";
import useCartStore from "@/store/cartStore";



export default function ProductDetail({ product }: { product: any }) {
  const addItem = useCartStore((state:any) => state.addItem);


  const images: string[] = product?.images?.map((img: any) => img.url)
  const mainImage = images[0];
  console.log(mainImage, 'main img');
  const otherImages = images.slice(1);

  return (
    <div className="min-h-screen">
      <Header/>
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded mb-4"
            />
            {otherImages.length > 0 && (
              <div className="flex gap-2 mt-2">
                {otherImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={product.name + ' thumbnail ' + (idx + 1)}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-2xl text-bold mb-6">Rs. {product.price}</p>

            <div className="space-y-2 mb-8 w-full">
              {product.options.map((option: any) => (
                <div key={option.id} className="border p-4 rounded">
                  <h3 className="font-semibold mb-2">{option.name}: {option.value}</h3>
                  <p className="text-gray-600 mb-2">+ Rs.{option.additionalPrice}</p>
                  <button
                    onClick={() => addItem({
                      productId: product.id,
                      optionId: option.id,
                      optionName: option.name,
                      optionValue: option.value,
                      price: parseFloat(product.price) + parseFloat(option.additionalPrice)
                    })}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}